
function parseIntoArray(value: string | null): number[] {
    if(!value) return []
    return value.split(',').map(x => parseInt(x))
}


export default defineNuxtPlugin(() => {
	const rules = useRuntimeConfig().public.iadminRules || {}
    
    return {
        /*WHMCS  customs */
        categories : {
            mainCategoryId:  rules?.mainCategoryId  ? parseInt(rules.mainCategoryId) : 62,
            domainNameRequired: rules?.requiredDomainCategories ? parseIntoArray(rules.requiredDomainCategories) :  [],
            domainNameFree: rules?.freeDomainCategories ? parseIntoArray(rules.freeDomainCategories) :  [],
        }, 

        freeExtensions: rules?.freeExtensions ? rules?.freeExtensions.split(',') : []


    }

})
