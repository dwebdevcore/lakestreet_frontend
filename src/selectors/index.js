export const getItemById = (source, id, idKey) => source.filter(item => item[idKey] === id)[0] || null;

export const getItemsByPortalId = (source, portalId) => {
    return source.allIds.indexOf(portalId) > -1 ? source.byPortalId[portalId] : null
};

export const getItemsByTaxonomylId = (source, taxonomyId) => {
    return source.allIds.indexOf(taxonomyId) > -1 ? source.byTaxonomyId[taxonomyId] : null
};