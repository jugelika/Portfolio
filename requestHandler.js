var requestHandler = {
	getCatsUri                : 'execute.php?act=getCatsJson',
	getCatIri                 : 'execute.php?act=getCatJson',
	getCatAttributesUri       : 'execute.php?act=getCatAttributes',
	getCatAttributesCountUri  : 'execute.php?act=getCatAttributesCount',
	updateAttributeOrderUri   : 'execute.php?act=updateCatAttributeOrder',
	deleteAttributeUri        : 'execute.php?act=deleteCatAttribute',
	deleteCatUri              : 'execute.php?act=deleteCat',
	updateCatOrderUri         : 'execute.php?act=updateCatOrder',
	getCatsCountUri           : 'execute.php?act=getCatsCount',
	getAttributeDataUri       : 'execute.php?act=getAttributeData',
	getRangesCountUri         : 'execute.php?act=getRangesCount',
	getAttributeRangesDataUri : 'execute.php?act=getAttributeRangesData',
	updateRangeOrderUri       : 'execute.php?act=updateRangeOrder',
	deleteRangeUri            : 'execute.php?act=deleteRange',
	updateAttributeDimUri     : 'execute.php?act=updateAttributeDim',
	getRangeDataUri           : 'execute.php?act=getRangeData',
	getAttributeValuesJsonUri : 'execute.php?act=getAttributeValuesJson',
	deleteAttributeValueUri   : 'execute.php?act=deleteAttributeValue',
	getAttributeValueUri      : 'execute.php?act=getAttributeValue',
	clearProductTmpUri 	  : 'execute.php?act=clearProductTmp',
	deleteProductTmpImageUri  : 'execute.php?act=deleteTmpImage',
	getProductAttributesUri   : 'execute.php?act=getProductAttributes',
	getProductJsonUri         : 'execute.php?act=getProductJson',
	getProductImagesJsonUri   : 'execute.php?act=getProductImagesJson',
	productImagesToTempUri    : 'execute.php?act=productImagesToTemp',
	deleteProductUri          : 'execute.php?act=deleteProduct',
	getProductAttributes : function(product_ID){
		var jsonData = null;
		var uri = this.getProductAttributesUri + '&product_ID='+product_ID;
			$.ajax({
				method: "GET",
				url: uri,
				async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	deleteProduct : function(product_ID){
		var jsonData = null;
		var uri = this.deleteProductUri + '&product_ID='+product_ID;
			$.ajax({
				method: "GET",
				url: uri,
				async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	getProductImagesJson : function(product_ID){
		var jsonData = null;
		var uri = this.getProductImagesJsonUri + '&product_ID='+product_ID;
			$.ajax({
				method: "GET",
				url: uri,
				async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;

	},
	productImagesToTemp : function(product_ID){
		var jsonData = null;
		var uri = this.productImagesToTempUri + '&product_ID='+product_ID;
			$.ajax({
				method: "GET",
				url: uri,
				async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	getProductJson : function(product_ID){
		var jsonData = null;
		var uri = this.getProductJsonUri + '&product_ID='+product_ID;
			$.ajax({
				method: "GET",
				url: uri,
				async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	clearProductTmp   : function(){
		var jsonData = null;
		var uri = this.clearProductTmpUri;
			$.ajax({
				method: "GET",
				url: uri,
				async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	deleteProductTmpImage : function(image){
		var uri = this.deleteProductTmpImageUri + '&image='+image;
			$.ajax({
				method: "GET",
				url: uri,
				async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	getAttributeValuesJson : function(attributeId){
		var jsonData = null;
		var uri = this.getAttributeValuesJsonUri + '&cat_attr_ID='+attributeId;
			$.ajax({
				method: "GET",
				url: uri,
				async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	deleteAttributeValue : function(attr_value_ID){
		var jsonData = null;
		var uri = this.deleteAttributeValueUri+'&cat_attr_value_ID='+attr_value_ID;
			$.ajax({
				method: "GET",
				url: uri,
				async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	getAttributeValue : function(valueId){
		var jsonData = null;
		var uri = this.getAttributeValueUri+'&cat_attr_value_ID='+valueId;
			$.ajax({
				method: "GET",
				url: uri,
				async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	getCat : function(id){
		var jsonData = null;
		var uri = this.getCatUri + '?ID='+id;
			$.ajax({
				method: "GET",
				url: uri,
				async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	getCats : function(){
		var jsonData = null;
			$.ajax({
			  method: "get",
			  url: this.getCatsUri,
			  async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	getCatAttributes : function(catId){
		var jsonData = null;
		var uri = this.getCatAttributesUri + '&cat_ID='+catId;
			$.ajax({
			  method: "get",
			  url: uri,
			  async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	getCatsCount : function(){
		var jsonData = null;
		var uri = this.getCatsCountUri;
			$.ajax({
			  method: "get",
			  url: uri,
			  async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	getAttributesCount : function(catId){
		var jsonData = null;
		var uri = this.getCatAttributesCountUri + '&cat_ID='+catId;
			$.ajax({
			  method: "get",
			  url: uri,
			  async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	getRangesCount : function(cat_attr_ID){
		var jsonData = null;
		var uri = this.getRangesCountUri + '&cat_attr_ID='+cat_attr_ID;
			$.ajax({
			  method: "get",
			  url: uri,
			  async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	getRangeData : function(range_ID){
		var jsonData = null;
		var uri = this.getRangeDataUri+'&range_ID='+range_ID;
			$.ajax({
			  method: "get",
			  url: uri,
			  async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	updateRangeOrder : function(range_ID,update_type){
		var jsonData = null;
		var uri = this.updateRangeOrderUri + '&range_ID='+range_ID+'&update_type='+update_type;
			$.ajax({
			  method: "get",
			  url: uri,
			  async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	deleteRange : function(range_ID){
		var jsonData = null;
		var uri = this.deleteRangeUri + '&range_ID='+range_ID;
			$.ajax({
			  method: "get",
			  url: uri,
			  async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	updateAttributeDim : function(attributeId,value){
		var jsonData = null;
		var uri = this.updateAttributeDimUri + '&cat_attr_ID='+attributeId+'&dim='+value;
			$.ajax({
			  method: "get",
			  url: uri,
			  async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	updateAttributeOrder : function(attr_ID,update_type){
		var jsonData = null;
		var uri = this.updateAttributeOrderUri + '&cat_attr_ID='+attr_ID+'&update_type='+update_type;
			$.ajax({
			  method: "get",
			  url: uri,
			  async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	getAttributeData : function(attributeId){
		var jsonData = null;
		var uri = this.getAttributeDataUri + '&cat_attr_ID='+attributeId;
			$.ajax({
			  method: "get",
			  url: uri,
			  async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	getAttributeRangesData : function(attributeId){
		var jsonData = null;
		var uri = this.getAttributeRangesDataUri + '&cat_attr_ID='+attributeId;
			$.ajax({
			  method: "get",
			  url: uri,
			  async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	updateCatOrder : function(cat_ID,update_type){
		var jsonData = null;
		var uri = this.updateCatOrderUri + '&cat_ID='+cat_ID+'&update_type='+update_type;
			$.ajax({
			  method: "get",
			  url: uri,
			  async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	deleteCat : function(cat_ID){
		var jsonData = null;
		var uri = this.deleteCatUri + '&cat_ID='+cat_ID;
			console.log(uri);
			$.ajax({
			  method: "get",
			  url: uri,
			  async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	},
	deleteAttribute : function(cat_attr_ID){
		var jsonData = null;
		var uri = this.deleteAttributeUri + '&cat_attr_ID='+cat_attr_ID;
			console.log(uri);
			$.ajax({
			  method: "get",
			  url: uri,
			  async:false,
			}).done(function( data ) {
			    jsonData = data;
			});
			return jsonData;
	}
};
