import {Editor} from 'slate-react';
import PropTypes from 'prop-types';
import Plain from 'slate-plain-serializer';
import React from 'react';

import {isKeyHotkey} from 'is-hotkey';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withStyles} from "@material-ui/core/styles";
import {classNames} from "../../../helpers/format";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";

const styles = theme => ({
    editorWrapper: {
        backgroundColor: theme.color.grey.light,
        borderBottom: `2px solid ${theme.color.grey.main}`,
        '& ol': {
            paddingLeft: theme.spacing.unit * 2
        },
        '& ul': {
            paddingLeft: theme.spacing.unit * 2
        },
        '& blockquote': {
            borderLeft: `2px solid ${theme.color.grey.main}`,
            color: theme.color.grey.main,
            paddingLeft: theme.spacing.unit * 2
        }
    },
    editor: {
        padding: theme.spacing.unit * 2,
    },
    icon: {
        fontSize: 14,
        marginRight: theme.spacing.unit * 2,
        color: theme.color.grey.dark
    },
    iconActive: {
        color: theme.palette.primary.main
    },
    iconWrapper: {
        cursor: 'pointer'
    },
    iconsContainer: {
        marginBottom: theme.spacing.unit * 2,
        display: 'flex',
        border: `1px solid ${theme.color.grey.main}`,
        padding: theme.spacing.unit * 2,
    },
    helper: {
        textAlign: 'right'
    }
});
/**
 * Define the default node type.
 *
 * @type {String}
 */

const DEFAULT_NODE = 'paragraph';

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

/**
 *
 * @type {Component}
 */

class RichTextEditor extends React.Component {
    static propTypes = {
        value: PropTypes.any.isRequired,
        onChange: PropTypes.func.isRequired,
        wordsLimit: PropTypes.number
    };
    state = {
        value: Plain.deserialize(''),
        wordsLimit: 0,
        remainingWords: 250
    };

    componentDidMount() {
        let value = typeof this.props.value === 'string' ?
            Plain.deserialize(this.props.value) : this.props.value;
        this.setState({
            value: value
        });
        if (this.props.wordsLimit) {
            this.setState({
                wordsLimit: this.props.wordsLimit
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        let value = typeof nextProps.value === 'string' ? Plain.deserialize(nextProps.value) : nextProps.value;
        this.setState({
            value: value
        });
        if (nextProps.wordsLimit) {
            this.setState({
                wordsLimit: nextProps.wordsLimit
            });
        }

        if (this.state.wordsLimit) {
            this.countWords(typeof nextProps.value !== 'string' ? Plain.serialize(nextProps.value) : nextProps.value);
        }
    }

    /**
     * Check if the current selection has a mark with `type` in it.
     *
     * @param {String} type
     * @return {Boolean}
     */

    hasMark = type => {
        const {value} = this.state;
        return value.activeMarks.some(mark => mark.type === type);
    };

    /**
     * Check if the any of the currently selected blocks are of `type`.
     *
     * @param {String} type
     * @return {Boolean}
     */

    hasBlock = type => {
        const {value} = this.state;
        return value.blocks.some(node => node.type === type);
    };

    /**
     * Store a reference to the `editor`.
     *
     * @param {Editor} editor
     */

    ref = editor => {
        this.editor = editor;
    };

    /**
     * Render.
     *
     * @return {Element}
     */

    render() {
        return (
            <div>
                <div className={this.props.classes.editorWrapper}>
                    <div className={this.props.classes.iconsContainer}>
                        {this.renderMarkButton('bold', 'bold')}
                        {this.renderMarkButton('italic', 'italic')}
                        {this.renderMarkButton('underlined', 'underline')}
                        {this.renderMarkButton('code', 'code')}
                        {this.renderBlockButton('heading-one', 'heading')}
                        {this.renderBlockButton('heading-two', 'heading')}
                        {this.renderBlockButton('block-quote', 'quote-right')}
                        {this.renderBlockButton('numbered-list', 'list-ol')}
                        {this.renderBlockButton('bulleted-list', 'list-ul')}
                    </div>
                    <Editor
                        className={this.props.classes.editor}
                        spellCheck
                        autoFocus
                        placeholder="Enter some rich text..."
                        ref={this.ref}
                        value={this.state.value}
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDown}
                        renderNode={this.renderNode}
                        renderMark={this.renderMark}
                    />
                </div>
                {this.state.wordsLimit > 0 &&
                <FormHelperText className={this.props.classes.helper} error={this.state.remainingWords <= 5}>
                    {`${this.state.remainingWords} words remaining`}
                </FormHelperText>}
            </div>
        )
    }


    /**
     * Render a mark-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    renderMarkButton = (type, icon) => {
        const isActive = this.hasMark(type);
        let iconClasses = [this.props.classes.icon];
        if (isActive) {
            iconClasses.push(this.props.classes.iconActive);
        }
        return (
            <div className={this.props.classes.iconWrapper}
                 onMouseDown={event => this.onClickMark(event, type)}>
                <FontAwesomeIcon
                    className={classNames(iconClasses)}
                    icon={icon}
                />
            </div>
        )
    };

    /**
     * Render a block-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    renderBlockButton = (type, icon) => {
        let isActive = this.hasBlock(type);

        if (['numbered-list', 'bulleted-list'].includes(type)) {
            const {value} = this.state;
            const parent = value.document.getParent(value.blocks.first().key);
            isActive = this.hasBlock('list-item') && parent && parent.type === type;
        }
        let iconClasses = [this.props.classes.icon];
        if (isActive) {
            iconClasses.push(this.props.classes.iconActive);
        }
        return (
            <div className={this.props.classes.iconWrapper}
                 onMouseDown={event => this.onClickBlock(event, type)}>
                <FontAwesomeIcon
                    className={classNames(iconClasses)}
                    icon={icon}/>
            </div>
        )
    };

    /**
     * Render a Slate node.
     *
     * @param {Object} props
     * @return {Element}
     */

    renderNode = (props, editor, next) => {
        const {attributes, children, node} = props;

        switch (node.type) {
            case 'block-quote':
                return <blockquote {...attributes}>{children}</blockquote>;
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>;
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>;
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>;
            case 'list-item':
                return <li {...attributes}>{children}</li>;
            case 'numbered-list':
                return <ol {...attributes}>{children}</ol>;
            default:
                return next();
        }
    };

    /**
     * Render a Slate mark.
     *
     * @param {Object} props
     * @return {Element}
     */

    renderMark = (props, editor, next) => {
        const {children, mark, attributes} = props;

        switch (mark.type) {
            case 'bold':
                return <strong {...attributes}>{children}</strong>;
            case 'code':
                return <code {...attributes}>{children}</code>;
            case 'italic':
                return <em {...attributes}>{children}</em>;
            case 'underlined':
                return <u {...attributes}>{children}</u>;
            default:
                return next()
        }
    };

    /**
     * On change, save the new `value`.
     *
     * @param {Editor} editor
     */

    onChange = ({value}) => {
        //this.setState({value: value});
        if (value) {
            this.props.onChange(this.props.name, value);
        }
    };


    countWords = (text) => {
        this.setState({
            remainingWords: this.state.wordsLimit - text.split(' ').length
        });
    };
    /**
     * On key down, if it's a formatting command toggle a mark.
     *
     * @param {Event} event
     * @param {Editor} editor
     * @return {Change}
     */

    onKeyDown = (event, editor, next) => {
        let mark;
        if (isBoldHotkey(event)) {
            mark = 'bold';
        } else if (isItalicHotkey(event)) {
            mark = 'italic';
        } else if (isUnderlinedHotkey(event)) {
            mark = 'underlined';
        } else if (isCodeHotkey(event)) {
            mark = 'code';
        } else {
            return next()
        }

        event.preventDefault();
        editor.toggleMark(mark);

    };

    /**
     * When a mark button is clicked, toggle the current mark.
     *
     * @param {Event} event
     * @param {String} type
     */

    onClickMark = (event, type) => {
        event.preventDefault();
        this.editor.toggleMark(type);
    };

    /**
     * When a block button is clicked, toggle the block type.
     *
     * @param {Event} event
     * @param {String} type
     */

    onClickBlock = (event, type) => {
        event.preventDefault();

        const {editor} = this;
        const {value} = editor;
        const {document} = value;

        // Handle everything but list buttons.
        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = this.hasBlock(type);
            const isList = this.hasBlock('list-item');

            if (isList) {
                editor
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list');
            } else {
                editor.setBlocks(isActive ? DEFAULT_NODE : type);
            }
        } else {
            // Handle the extra wrapping required for list buttons.
            const isList = this.hasBlock('list-item');
            const isType = value.blocks.some(block => {
                return !!document.getClosest(block.key, parent => parent.type === type)
            });

            if (isList && isType) {
                editor
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list');
            } else if (isList) {
                editor
                    .unwrapBlock(
                        type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
                    )
                    .wrapBlock(type);
            } else {
                editor.setBlocks('list-item').wrapBlock(type);
            }
        }
    }
}

/**
 * Export.
 */
export default withStyles(styles)(RichTextEditor);