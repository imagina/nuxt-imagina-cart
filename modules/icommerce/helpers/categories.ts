const helper = {
    
	async getSelectedCategory(slug, categories){
		console.log(categories)
			
		let category = categories.find(item => {
			if(slug == item.slug){
				return item
			}
		}) 
		if(!category) {
				category = categories[0]		
		}		
		return category	
  }
}

export default helper