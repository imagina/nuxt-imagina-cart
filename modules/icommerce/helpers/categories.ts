const categories = {
    
	async getSelectedCategory(params){		
    
    let categories = null
    await $fetch('/api/icommerce/categories').then(response => {		
			categories = response			
		})
		let category = categories.find(item => {
			if(params?.slug == item.slug){
				return item
			}
		}) 
		if(!category) {
				category = categories[0]		
		}		
		return category	
  }
}

export default categories