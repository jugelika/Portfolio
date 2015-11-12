cats = {
	ActiveAddButton : 'btn btn-default active',
	AddButton : 'btn btn-default',
	EditTitleLastText : null,
	EditTitleCanceled : 0,
	EditCatIcon : function(id){
		var iconSelected = icons.LastIcon;
			formHandler.EditCategoryIcon(id,iconSelected);
			this.hideEditIconHtml(id,iconSelected);
	},
	EditCatTitle : function(object,id){
		var InputValue = $('#EditCatTitleInput'+id).val();
			formHandler.EditCategoryTitle(id,InputValue);
			this.EditTitleLastText = InputValue;
			this.hideEditTitleHtml(object,id);
		var panelTitle = document.getElementById('panelTitle'+id);
			panelTitle.innerHTML=InputValue+'<span class="pull-right"><i class="glyphicon glyphicon-chevron-up"></i></span>';
	},
	showEditTitleHtml : function (object,id){
		if(this.EditTitleCanceled==1){
			this.EditTitleCanceled = 0;
		}else{
			var txt = $(object).text();
				this.EditTitleLastText = txt;
				$(object).attr('onclick','');
				$(object).attr('style','');
				$(object).html('<div class="col-xs-6"><input class="form-control" type="text" value="'+txt+'" id="EditCatTitleInput'+id+'"></input></div>'+
						'<div class="col-xs-1 EditCatTitleButton"><button class="btn btn-default" onclick="cats.EditCatTitle(this,'+id+')">ცვლილება</button></div>'+
						'<div class="col-xs-1 EditCatTitleButton"><button class="btn btn-default" onclick="cats.hideEditTitleHtml(this,'+id+')">გაუქმება</button></div>');
		}
	},
	showAttributeTypesInformation : function(){
		alertify.alert('<p>This is an alert message!</p><p>This is an alert message!</p>');
	},
	hideEditTitleHtml : function(innerObject,id){
		var object = $(innerObject).parent().parent();
			$(object).attr('style','font-size:29px;');
			$(object).html(''+this.EditTitleLastText);
			this.EditTitleCanceled = 1;
			$(object).attr('onclick','cats.showEditTitleHtml(this,'+id+')');
	},
	showEditIconHtml : function(id,icon){
		var editableIconDiv      = '#EditableIcon'+id;
		var editableIconsListDiv = 'EditIconsList'+id;
		var hideFunctionName     = 'cats.hideEditIconHtml('+id+',\''+icon+'\')';
			icons.appendIcons(editableIconsListDiv,2,id,icon);
			$(editableIconDiv).attr('style','background:#00DE81;border-radius:5px;');
			$(editableIconDiv).attr('class',icon+' fa-4x EditIconBox blink');
			$(editableIconDiv).attr('onclick',""+hideFunctionName);
			$('#'+editableIconsListDiv).append('<button type="button" class="btn btn-primary pull-right EditIconButton" onclick="'+hideFunctionName+'">გაუქმება</button>');
			$('#'+editableIconsListDiv).append('<button type="button" class="btn btn-primary pull-right EditIconButton" onclick="cats.EditCatIcon('+id+')">შენახვა</button>');
	},
	hideEditIconHtml : function(id,icon){
		var editableIconDiv = '#EditableIcon'+id;
			$(editableIconDiv).attr('style','');
			$(editableIconDiv).attr('class',icon+' fa-4x EditIconBox');
			$(editableIconDiv).attr('onclick','cats.showEditIconHtml('+id+',"'+icon+'")');
			$('#EditIconsList'+id).html('');
	},
	showAddCatHtml : function(){
		$('#add_button').attr('class', this.ActiveAddButton);
		$('#add_button').attr('onclick','cats.hideAddCatHtml()');
		$('#add_category_div').append('<div class="add_form"><form id="addCatForm" role="form" method="POST"></form></div>');
		$('#addCatForm').append('<div class="form-group"><label for="title">კატეგორიის დასახელება</label><input name="title" type="text" class="form-control" required/></div>');
		$('#addCatForm').append('<div class="form-group"><label for="icon">კატეგორიის სურათი(აირჩიეთ სასურველ სურათზე დაკლიკვით)</label><input type="text" id="IconInput" name="icon" class="form-control" required><div id="iconsDiv" class="iconsDiv"></div></div>');
		icons.appendIcons('iconsDiv',1);
		$('#addCatForm').append('<div class="form-group"><label for="submit"><button type="button" onclick="formHandler.AddCatForm()" class="btn btn-primary" class="submitAddForm">დამატება</button></label></div>');
	},
	hideAddCatHtml : function(){
		$('#add_button').attr('class', this.AddButton);
		$('#add_category_div').html('');
		$('#add_button').attr('onclick','cats.showAddCatHtml()');
	},
	showCats : function(jsonData){
		var data = $.parseJSON(jsonData);
			for(var i = 0; i<data.length; i++){
				data[i]['num'] = i;
				this.addCategoryHtml(data[i]);
			}
	},
	addCategoryHtml : function(data){
		var cats    = document.getElementById('cats');
		var controlButtons = this.getCatControlButtons(data);
		var mainDiv = document.createElement("div");
			mainDiv.setAttribute('class','panel panel-default panel-faq');
		var headingDiv = document.createElement("div");
			headingDiv.setAttribute('class','panel-heading');
		var tabLink = document.createElement('a');
			tabLink.setAttribute('data-toggle','collapse');
			tabLink.setAttribute('href','#tab-'+data['num']);
		var tabTitle = document.createElement('h4');
			tabTitle.setAttribute('class','panel-title');
			tabTitle.setAttribute('id','panelTitle'+data['cat_ID']);
			tabTitle.innerHTML=data['title']+' <span class="pull-right"><i class="glyphicon glyphicon-chevron-down"></i></span>';
			tabLink.appendChild(tabTitle);
			headingDiv.appendChild(tabLink);
		var contentDiv = document.createElement('div');
			contentDiv.setAttribute('id','tab-'+data['num']);
			contentDiv.setAttribute('class','panel-collapse collapse');
		var panelBody = document.createElement('div');
			panelBody.setAttribute('class','panel-body');
		var panelBodyInner = this.getCategoryTitleAndIcon(data);
			panelBody.appendChild(panelBodyInner);
		var EditIconsListDiv = document.createElement('div');
			EditIconsListDiv.setAttribute('class','row');
			EditIconsListDiv.setAttribute('id','EditIconsList'+data['cat_ID']);
			panelBody.appendChild(EditIconsListDiv);
		var attributesListTitle = this.getAttributesListTitle(data['cat_ID']);
		var attributesList = this.getAttributesList(data['cat_ID']);
			panelBody.appendChild(attributesListTitle);
			panelBody.appendChild(attributesList);
			contentDiv.appendChild(panelBody);
			mainDiv.appendChild(headingDiv);
			mainDiv.appendChild(contentDiv);
			cats.appendChild(controlButtons);
			cats.appendChild(mainDiv);
			this.initializeCatsCollapser();
	},
	getCatControlButtons : function(data){
		var catsMax = requestHandler.getCatsCount();
		var mainDiv = document.createElement('div');
			mainDiv.setAttribute('class','pull-right catControls');
			mainDiv.setAttribute('id','catControls'+data['cat_ID']);
		var upSpan = document.createElement('span');
			if(data['ord']!=1){
				upSpan.setAttribute('class','fa fa-long-arrow-up fa-2x');
				upSpan.setAttribute('onclick','cats.updateCatOrder('+data['cat_ID']+',-1)');
			}else{
				upSpan.setAttribute('class','fa fa-2x');
			}
		var downSpan = document.createElement('span');
			if(data['ord']!=catsMax){
				downSpan.setAttribute('class','fa fa-long-arrow-down fa-2x');
				downSpan.setAttribute('onclick','cats.updateCatOrder('+data['cat_ID']+',1)');
			}else{
				downSpan.setAttribute('class','fa fa-2x');
			}
		var removeSpan = document.createElement('span');
			removeSpan.setAttribute('class','fa fa-remove fa-2x');
			removeSpan.setAttribute('onclick','cats.deleteCat('+data['cat_ID']+')');
			mainDiv.appendChild(upSpan);
			mainDiv.appendChild(downSpan);
			mainDiv.appendChild(removeSpan);
			return mainDiv;
	},
	getAttributesListTitle : function(id){
		var catAttributeTitleDiv = document.createElement("div");
			catAttributeTitleDiv.setAttribute('class','row attributes_title');
			catAttributeTitleDiv.setAttribute('id','attributes_title'+id);
			catAttributeTitleDiv.innerHTML = 'ატრიბუტები';
			return catAttributeTitleDiv;
	},
	getAttributesList : function(id){
		var attributesListDiv =  document.createElement('div');
			attributesListDiv.setAttribute('class', 'row attributes_list');
			attributesListDiv.setAttribute('id','attributes_list'+id);
		var attributesData = requestHandler.getCatAttributes(id);
		var data = $.parseJSON(attributesData);
			for(var i = 0; i<data.length; i++){
				var attributeItem = this.getAttributeHtml(data[i]);
					attributesListDiv.appendChild(attributeItem);
				var editAttributeDiv = this.getEditAttributeDiv(data[i]['cat_attr_ID']);
					attributesListDiv.appendChild(editAttributeDiv);
			}
		var addButton = this.getAddAttributeButton(id);
			attributesListDiv.appendChild(addButton);
			return attributesListDiv;
	},
	showAddRangeHtml : function(attributeId){
		var beforeDiv = document.getElementById('addRangeButtonDiv'+attributeId);
		var mainDiv = document.createElement('div');
			mainDiv.setAttribute('class','row');
			mainDiv.setAttribute('id','addRangeMainDiv'+attributeId);
		var addRangeForm = document.createElement('form');
			addRangeForm.setAttribute('id','addRangeForm'+attributeId);
		var innerDiv = document.createElement('div');
			innerDiv.setAttribute('class','col-xs-3 col-offset-2 addRangeDiv');
			innerDiv.setAttribute('id','addRandeDiv'+attributeId);
		var titleDiv = document.createElement('div');
			titleDiv.setAttribute('class','col-xs-12');
		var titleSpan = document.createElement('span');
			titleSpan.innerHTML = 'დასახელება';
		var titleInput = document.createElement('input');
			titleInput.setAttribute('name','rng_name');
			titleInput.setAttribute('type','text');
			titleInput.setAttribute('class','form-control');
			titleInput.setAttribute('id','rangeNameInput'+attributeId);
			titleDiv.appendChild(titleSpan);
			titleDiv.appendChild(titleInput);
		var rangeStartDiv = document.createElement('div');
			rangeStartDiv.setAttribute('class','col-xs-5');
		var rangeStartInput = document.createElement('input');
			rangeStartInput.setAttribute('type','number');
			rangeStartInput.setAttribute('step','0.0001');
			rangeStartInput.setAttribute('name','rng_start');
			rangeStartInput.setAttribute('class','form-control');
			rangeStartInput.setAttribute('id','rangeStartInput'+attributeId);
		var rangeStartSpan = document.createElement('span');
			rangeStartSpan.innerHTML = 'დან';
			rangeStartDiv.appendChild(rangeStartInput);
			rangeStartDiv.appendChild(rangeStartSpan);
		var rangeEndDiv = document.createElement('div');
			rangeEndDiv.setAttribute('class','col-xs-5');
		var rangeEndInput = document.createElement('input');
			rangeEndInput.setAttribute('type','number');
			rangeEndInput.setAttribute('step','0.0001');
			rangeEndInput.setAttribute('name','rng_end');
			rangeEndInput.setAttribute('class','form-control');
			rangeEndInput.setAttribute('id','rangEndInput'+attributeId);
		var rangeEndSpan = document.createElement('span');
			rangeEndSpan.innerHTML = 'მდე';
			rangeEndDiv.appendChild(rangeEndInput);
			rangeEndDiv.appendChild(rangeEndSpan);
		var rangeAddButtonDiv = document.createElement('div');
			rangeAddButtonDiv.setAttribute('class','col-xs-2');
		var rangeAddButton  = document.createElement('button');
			rangeAddButton.setAttribute('class','btn btn-success');
			rangeAddButton.setAttribute('onclick','cats.addRange('+attributeId+')');
			rangeAddButton.setAttribute('type','button');
			rangeAddButton.innerHTML = 'დამატება';
			rangeAddButtonDiv.appendChild(rangeAddButton);
			innerDiv.appendChild(titleDiv);
			innerDiv.appendChild(rangeStartDiv);
			innerDiv.appendChild(rangeEndDiv);
			innerDiv.appendChild(rangeAddButtonDiv);
			addRangeForm.appendChild(innerDiv);
			mainDiv.appendChild(addRangeForm);
			$(beforeDiv).after(mainDiv);
		var addBut = document.getElementById('addRangeButton'+attributeId);
			addBut.setAttribute('class','col-xs-3 col-offset-2 btn btn-default addRangeButton');
			addBut.innerHTML = 'გაუქმება';
			addBut.setAttribute('onclick','cats.hideAddRangeHtml('+attributeId+')');
	},
	showEditRangeHtml : function(rangeId){
		var beforeDiv = document.getElementById('rangeDiv'+rangeId);
		var rangeData = requestHandler.getRangeData(rangeId);
		var data = $.parseJSON(rangeData)[0];

		var mainDiv = document.createElement('div');
			mainDiv.setAttribute('class','row');
			mainDiv.setAttribute('id','editRangeMainDiv'+rangeId);
		var editRangeForm = document.createElement('form');
			editRangeForm.setAttribute('id','editRangeForm'+rangeId);
		var innerDiv = document.createElement('div');
			innerDiv.setAttribute('class','col-xs-3 col-offset-2 addRangeDiv');
			innerDiv.setAttribute('id','editRandeDiv'+rangeId);
		var titleDiv = document.createElement('div');
			titleDiv.setAttribute('class','col-xs-12');
		var titleSpan = document.createElement('span');
			titleSpan.innerHTML = 'დასახელება';
		var titleInput = document.createElement('input');
			titleInput.setAttribute('name','rng_name');
			titleInput.setAttribute('type','text');
			titleInput.setAttribute('class','form-control');
			titleInput.setAttribute('id','editRangeNameInput'+rangeId);
			titleInput.setAttribute('value',data['rng_name']);
			titleDiv.appendChild(titleSpan);
			titleDiv.appendChild(titleInput);
		var rangeStartDiv = document.createElement('div');
			rangeStartDiv.setAttribute('class','col-xs-5');
		var rangeStartInput = document.createElement('input');
			rangeStartInput.setAttribute('type','number');
			rangeStartInput.setAttribute('step','0.0001');
			rangeStartInput.setAttribute('name','rng_start');
			rangeStartInput.setAttribute('class','form-control');
			rangeStartInput.setAttribute('id','editRangeStartInput'+rangeId);
			rangeStartInput.setAttribute('value',data['rng_start']);
		var rangeStartSpan = document.createElement('span');
			rangeStartSpan.innerHTML = 'დან';
			rangeStartDiv.appendChild(rangeStartInput);
			rangeStartDiv.appendChild(rangeStartSpan);
		var rangeEndDiv = document.createElement('div');
			rangeEndDiv.setAttribute('class','col-xs-5');
		var rangeEndInput = document.createElement('input');
			rangeEndInput.setAttribute('type','number');
			rangeEndInput.setAttribute('step','0.0001');
			rangeEndInput.setAttribute('name','rng_end');
			rangeEndInput.setAttribute('class','form-control');
			rangeEndInput.setAttribute('id','editRangEndInput'+rangeId);
			rangeEndInput.setAttribute('value',data['rng_end']);
		var rangeEndSpan = document.createElement('span');
			rangeEndSpan.innerHTML = 'მდე';
			rangeEndDiv.appendChild(rangeEndInput);
			rangeEndDiv.appendChild(rangeEndSpan);
		var rangeAddButtonDiv = document.createElement('div');
			rangeAddButtonDiv.setAttribute('class','col-xs-2');
		var rangeAddButton  = document.createElement('button');
			rangeAddButton.setAttribute('class','btn btn-success');
			rangeAddButton.setAttribute('onclick','cats.editRange('+rangeId+')');
			rangeAddButton.setAttribute('type','button');
			rangeAddButton.innerHTML = 'ცვლილება';
			rangeAddButtonDiv.appendChild(rangeAddButton);
			innerDiv.appendChild(titleDiv);
			innerDiv.appendChild(rangeStartDiv);
			innerDiv.appendChild(rangeEndDiv);
			innerDiv.appendChild(rangeAddButtonDiv);
			editRangeForm.appendChild(innerDiv);
			mainDiv.appendChild(editRangeForm);
			$(beforeDiv).after(mainDiv);
		var titleBut = document.getElementById('rangeTitle'+rangeId);
			titleBut.setAttribute('class','col-xs-3 col-offset-2 btn btn-default range_title');
			titleBut.innerHTML = 'გაუქმება';
			titleBut.setAttribute('onclick','cats.hideEditRangeHtml('+rangeId+')');
	},

	hideEditRangeHtml : function(rangeId){
		var rangeData = requestHandler.getRangeData(rangeId);
		var data = $.parseJSON(rangeData)[0];
		var editDiv = document.getElementById('editRangeMainDiv'+rangeId);
		$(editDiv).remove();
		var titleBut = document.getElementById('rangeTitle'+rangeId);
			titleBut.setAttribute('class','col-xs-3 col-offset-2 btn btn-info range_title');
			titleBut.innerHTML = data['rng_name'];
			titleBut.setAttribute('onclick','cats.showEditRangeHtml('+rangeId+')');
	},
	hideAddRangeHtml : function(attributeId){
		var mainDiv = document.getElementById('addRangeMainDiv'+attributeId);
			$(mainDiv).remove();
		var addBut = document.getElementById('addRangeButton'+attributeId);
			addBut.setAttribute('class','col-xs-3 col-offset-2 btn btn-success addRangeButton');
			addBut.innerHTML = 'დამატება';
			addBut.setAttribute('onclick','cats.showAddRangeHtml('+attributeId+')');
	},
	getEditAttributeDiv   : function(attributeId){
		var mainDiv = document.createElement('div');
			mainDiv.setAttribute('id','editAttributeDiv'+attributeId);
			return mainDiv;
	},
	showEditAttributeHtml : function(attributeId){
		var mainDiv = document.getElementById('editAttributeDiv'+attributeId);
		var jsonData = requestHandler.getAttributeData(attributeId);
		var attributeData = $.parseJSON(jsonData)[0];
		var editAttributeDiv = document.createElement("div");
			editAttributeDiv.setAttribute('class','row editAttribute');
			editAttributeDiv.setAttribute('id','editAttributeDiv'+attributeId);
		var editAttributeForm = document.createElement('form');
			editAttributeForm.setAttribute('id','editAttributeForm'+attributeId);
		var titleInputDiv = document.createElement('div');
			titleInputDiv.setAttribute('class','col-xs-6');
		var titleDescriptionSpan = document.createElement('span');
			titleDescriptionSpan.innerHTML = 'დასახელება';
		var titleInput = document.createElement('input');
			titleInput.setAttribute('type','text');
			titleInput.setAttribute('name','title');
			titleInput.setAttribute('class','form-control');
			titleInput.setAttribute('required','required');
			titleInput.setAttribute('value',''+attributeData['title']);
			titleInputDiv.appendChild(titleDescriptionSpan);
			titleInputDiv.appendChild(titleInput);
		var typeSelectDiv = document.createElement('div');
			typeSelectDiv.setAttribute('class','col-xs-4');
		var typeSelectDescriptionSpan = document.createElement('span');
			typeSelectDescriptionSpan.innerHTML = 'ტიპი';
		var typeSelect = document.createElement('select');
		 	typeSelect.setAttribute('name','type');
		 	typeSelect.setAttribute('class','form-control');
			typeSelect.setAttribute('onchange','cats.checkAttributeType('+attributeId+',this.value)');
		var typeOption1 =  document.createElement('option');
			typeOption1.setAttribute('value','1');
			typeOption1.innerHTML ='კი/არა';
			if(attributeData['type']==1){
				typeOption1.setAttribute('selected','selected');
			}
		var typeOption2 = document.createElement('option');
			typeOption2.setAttribute('value','2');
			typeOption2.innerHTML = 'ფიქსირებული მნიშვნელობა';
			if(attributeData['type']==2){
				typeOption2.setAttribute('selected','selected');
			}
		var typeOption3 = document.createElement('option');
			typeOption3.setAttribute('value','3');
			typeOption3.innerHTML = 'რიცხვითი მნიშვნელობა';
			if(attributeData['type']==3){
				typeOption3.setAttribute('selected','selected');
			}
			typeSelect.appendChild(typeOption1);
			typeSelect.appendChild(typeOption2);
			typeSelect.appendChild(typeOption3);
			typeSelectDiv.appendChild(typeSelectDescriptionSpan);
			typeSelectDiv.appendChild(typeSelect);
		var questionDiv = document.createElement('div');
			questionDiv.setAttribute('class','col-xs-2');
		var questionSpan = document.createElement('span');
			questionSpan.setAttribute('class','fa fa-question fa-2x attributeQuestionButton');
			questionSpan.setAttribute('onclick','cats.showAttributeTypesInformation()');
			questionDiv.appendChild(questionSpan);
		var addAttributeActionButtonDiv = document.createElement('div');
			addAttributeActionButtonDiv.setAttribute('class','col-xs-12 addAttributeActionButton');
			addAttributeActionButtonDiv.setAttribute('id','addAttributeActionButtonDiv'+attributeId);
		var addAttributeActionButton =  document.createElement('button');
			addAttributeActionButton.setAttribute('class','btn btn-success');
			addAttributeActionButton.setAttribute('type','button');
			addAttributeActionButton.setAttribute('onclick','cats.editAttribute('+attributeId+')');
			addAttributeActionButton.innerHTML = 'ცვლილება';
			addAttributeActionButtonDiv.appendChild(addAttributeActionButton);
			editAttributeForm.appendChild(titleInputDiv);
			editAttributeForm.appendChild(typeSelectDiv);
			editAttributeForm.appendChild(questionDiv);
			editAttributeForm.appendChild(addAttributeActionButtonDiv);
			editAttributeDiv.appendChild(editAttributeForm);
			mainDiv.appendChild(editAttributeDiv);
		var mainButton = document.getElementById('attributeTitleButton'+attributeId);
			mainButton.setAttribute('class','col-xs-6 col-offset-2 btn btn-default attribute_title');
			mainButton.innerHTML = 'გაუქმება';
			mainButton.setAttribute('onclick','cats.hideEditAttributeHtml('+attributeId+')');
			if(attributeData['type']==3){
				mainDiv.appendChild(this.getAttributeRanges(attributeId));
			}else if(attributeData['type']==2){
				mainDiv.appendChild(this.getAttributeValues(attributeId));
			}else{
				var rangesDiv = document.getElementById('rangesDiv'+attributeId);
					$(rangesDiv).remove();
			}
	},
	getAttributeValues : function(attributeId){
		var valuesDiv = document.createElement('div');
			valuesDiv.setAttribute('id','attributeValuesDiv'+attributeId);
		var valuesTitle = document.createElement('div');
			valuesTitle.setAttribute('class','col-xs-12 attributeRangesTitle');
			valuesTitle.setAttribute('id','attributeValuesTitle'+attributeId);
			valuesTitle.innerHTML = 'ატტრიბუტის მნიშვნელობები';
			valuesDiv.appendChild(valuesTitle);
		var valuesData = requestHandler.getAttributeValuesJson(attributeId);
		var data = $.parseJSON(valuesData);
		var wrapperDiv = document.createElement('div');
			wrapperDiv.setAttribute('class','col-xs-12 attributeRangesDiv');
			for(var i=0;i<data.length;i++){
				var valueDiv = this.getAttributeValueHtml(data[i]);
				wrapperDiv.appendChild(valueDiv);
			}
		var addValueButtonDiv = document.createElement('div');
			addValueButtonDiv.setAttribute('class','row');
			addValueButtonDiv.setAttribute('id','addValueButtonDiv'+attributeId);
		var addValueButton = document.createElement('div');
			addValueButton.setAttribute('class','col-xs-3 col-offset-2 btn btn-success addRangeButton');
			addValueButton.setAttribute('id','addValueButton'+attributeId);
			addValueButton.setAttribute('onclick','cats.showAddValueHtml('+attributeId+')');
			addValueButton.innerHTML = 'დამატება';
			addValueButtonDiv.appendChild(addValueButton);
			wrapperDiv.appendChild(addValueButtonDiv);
			valuesDiv.appendChild(wrapperDiv);
			return valuesDiv;
	},
	showAddValueHtml : function(attributeId){
		var beforeDiv = document.getElementById('addValueButtonDiv'+attributeId);
		var mainDiv = document.createElement('div');
			mainDiv.setAttribute('class','row');
			mainDiv.setAttribute('id','addValueMainDiv'+attributeId);
		var mainForm = document.createElement('form');
			mainForm.setAttribute('id','addAttributeValueForm'+attributeId);
		var wrapperDiv = document.createElement('div');
			wrapperDiv.setAttribute('class','col-xs-3 col-offset-2 addRangeDiv');
			wrapperDiv.setAttribute('id','addValueDiv'+attributeId);
		var inputDiv = document.createElement('div');
			inputDiv.setAttribute('class','col-xs-12');
		var inputSpan = document.createElement('span');
			inputSpan.innerHTML = 'მნიშვნელობა';
		var input = document.createElement('input');
			input.setAttribute('class','form-control');
			input.setAttribute('type','name');
			input.setAttribute('name','value');
			input.setAttribute('id','attributeValueInput'+attributeId);
			inputDiv.appendChild(inputSpan);
			inputDiv.appendChild(input);
		var addActionButtonDiv = document.createElement('div');
			addActionButtonDiv.setAttribute('class','col-xs-12');
		var addActionButton = document.createElement('button');
			addActionButton.setAttribute('class','btn btn-success');
			addActionButton.setAttribute('onclick','cats.addAttributeValue('+attributeId+')');
			addActionButton.setAttribute('type','button');
			addActionButton.innerHTML = 'დამატება';
			addActionButtonDiv.appendChild(addActionButton);
			wrapperDiv.appendChild(inputDiv);
			wrapperDiv.appendChild(addActionButtonDiv);
			mainForm.appendChild(wrapperDiv);
			mainDiv.appendChild(mainForm);
		var addBut = document.getElementById('addValueButton'+attributeId);
			addBut.setAttribute('class','col-xs-3 col-offset-2 btn btn-default addRangeButton');
			addBut.innerHTML = 'გაუქმება';
			addBut.setAttribute('onclick','cats.hideAddValueHtml('+attributeId+')');
			$(beforeDiv).after(mainDiv);
	},
	hideAddValueHtml : function(attributeId){
		var mainDiv = document.getElementById('addValueMainDiv'+attributeId);
			$(mainDiv).remove();
		var addBut = document.getElementById('addValueButton'+attributeId);
			addBut.setAttribute('class','col-xs-3 col-offset-2 btn btn-success addRangeButton');
			addBut.innerHTML = 'დამატება';
			addBut.setAttribute('onclick','cats.showAddValueHtml('+attributeId+')');
	},
	getAttributeValueHtml : function(data){
		var mainDiv = document.createElement('div');
			mainDiv.setAttribute('class','row range_item');
			mainDiv.setAttribute('id','valuesDiv'+data['cat_attr_value_ID']);
		var titleDiv = document.createElement('div');
			titleDiv.setAttribute('class','col-xs-3 col-offset-2 btn btn-info range_title');
			titleDiv.setAttribute('id','valuesTitle'+data['cat_attr_value_ID']);
			titleDiv.setAttribute('onclick','cats.showEditValueHtml('+data['cat_attr_value_ID']+')');
			titleDiv.innerHTML = data['value'];
		var controlsDiv = document.createElement('div');
			controlsDiv.setAttribute('class','col-xs-6 rangeControlButtons');
		var removeSpan = document.createElement('span');
			removeSpan.setAttribute('class','fa fa-remove fa-2x');
			removeSpan.setAttribute('onclick','cats.deleteAttributeValue('+data['cat_attr_ID']+','+data['cat_attr_value_ID']+')');
			mainDiv.appendChild(titleDiv);
			controlsDiv.appendChild(removeSpan);
			mainDiv.appendChild(controlsDiv);
			return mainDiv;
	},
	showEditValueHtml(valueId){
		var valueData = requestHandler.getAttributeValue(valueId);
		var data = $.parseJSON(valueData)[0];
		attributeId = data['cat_attr_ID'];
		var beforeDiv = document.getElementById('valuesDiv'+valueId);
		var mainDiv = document.createElement('div');
			mainDiv.setAttribute('class','row');
			mainDiv.setAttribute('id','editValueMainDiv'+valueId);
		var mainForm = document.createElement('form');
			mainForm.setAttribute('id','editAttributeValueForm'+valueId);
		var wrapperDiv = document.createElement('div');
			wrapperDiv.setAttribute('class','col-xs-3 col-offset-2 addRangeDiv');
			wrapperDiv.setAttribute('id','editValueDiv'+valueId);
		var inputDiv = document.createElement('div');
			inputDiv.setAttribute('class','col-xs-12');
		var inputSpan = document.createElement('span');
			inputSpan.innerHTML = 'მნიშვნელობა';
		var input = document.createElement('input');
			input.setAttribute('class','form-control');
			input.setAttribute('type','name');
			input.setAttribute('name','value');
			input.setAttribute('id','attributeValueInput'+valueId);
			input.setAttribute('value',data['value'])
			inputDiv.appendChild(inputSpan);
			inputDiv.appendChild(input);
		var addActionButtonDiv = document.createElement('div');
			addActionButtonDiv.setAttribute('class','col-xs-12');
		var addActionButton = document.createElement('button');
			addActionButton.setAttribute('class','btn btn-success');
			addActionButton.setAttribute('onclick','cats.editAttributeValue('+attributeId+','+valueId+')');
			addActionButton.setAttribute('type','button');
			addActionButton.innerHTML = 'ცვლილება';
			addActionButtonDiv.appendChild(addActionButton);
			wrapperDiv.appendChild(inputDiv);
			wrapperDiv.appendChild(addActionButtonDiv);
			mainForm.appendChild(wrapperDiv);
			mainDiv.appendChild(mainForm);
		var editBut = document.getElementById('valuesTitle'+valueId);
			editBut.setAttribute('class','col-xs-3 col-offset-2 btn btn-default range_title');
			editBut.innerHTML = 'გაუქმება';
			editBut.setAttribute('onclick','cats.hideEditValueHtml('+valueId+')');
			$(beforeDiv).after(mainDiv);
	},
	hideEditValueHtml : function(valueId){
		var valueData = requestHandler.getAttributeValue(valueId);
		var data = $.parseJSON(valueData)[0];
		var editBut = document.getElementById('valuesTitle'+valueId);
			editBut.setAttribute('class','col-xs-3 col-offset-2 btn btn-info range_title');
			editBut.innerHTML = data['value'];
			editBut.setAttribute('onclick','cats.showEditValueHtml('+valueId+')');
		var mainDiv = document.getElementById('editValueMainDiv'+valueId);
		$(mainDiv).remove();
	},
	checkAttributeType : function(attributeId,value){
		if(value==3){
			var mainDiv = document.getElementById('editAttributeDiv'+attributeId);
				mainDiv.appendChild(this.getAttributeRanges(attributeId));
		}else{
			var mainDiv = document.getElementById('rangesDiv'+attributeId);
				$(mainDiv).remove();
		}
	},
	hideEditAttributeHtml : function(attributeId){
		var jsonData = requestHandler.getAttributeData(attributeId);
		var attributeData = $.parseJSON(jsonData)[0];
		var mainDiv = document.getElementById('editAttributeDiv'+attributeId);
			mainDiv.innerHTML = '';
		var mainButton = document.getElementById('attributeTitleButton'+attributeId);
			mainButton.setAttribute('class','col-xs-6 col-offset-2 btn btn-primary attribute_title');
			mainButton.innerHTML = attributeData['title'];
			mainButton.setAttribute('onclick','cats.showEditAttributeHtml('+attributeId+')');
	},
	getAttributeRanges : function(attributeId){
		var jsonData = requestHandler.getAttributeData(attributeId);
		var attributeData = $.parseJSON(jsonData)[0];
		var beforeForm = document.getElementById('editAttributeForm'+attributeId);
		var mainDiv = document.createElement('div');
			mainDiv.setAttribute('id','rangesDiv'+attributeId);
	 	var rangesTitleDiv = document.createElement('div');
			rangesTitleDiv.setAttribute('class','col-xs-12 attributeRangesTitle');
			rangesTitleDiv.setAttribute('id','attributeRangesTitle'+attributeId);
			rangesTitleDiv.innerHTML = 'ატრიბუტის პარამეტრები';
		var dimInputDiv = document.createElement('div');
			dimInputDiv.setAttribute('class','col-xs-3 dimInputDiv');
			dimInputDiv.setAttribute('id', 'dimInputDiv'+attributeId);
		var dimInputTitle = document.createElement('span');
			dimInputTitle.innerHTML = 'განზომილება';
		var dimInput = document.createElement('input');
			dimInput.setAttribute('class','form-control');
			dimInput.setAttribute('name','dim');
			dimInput.setAttribute('type','text');
			dimInput.setAttribute('id','dimInput'+attributeId);
			dimInput.setAttribute('value',attributeData['dim']);
		var dimInputButton = document.createElement('div');
			dimInputButton.setAttribute('class','btn btn-primary');
			dimInputButton.setAttribute('id','dimInputButton'+attributeId);
			dimInputButton.setAttribute('onclick','cats.updateAttributeDim('+attributeId+')');
			dimInputButton.innerHTML = 'ცვლილება';
			dimInputDiv.appendChild(dimInputTitle);
			dimInputDiv.appendChild(dimInput);
			dimInputDiv.appendChild(dimInputButton);
		var rangesList = this.getAttributeRangesList(attributeId);
			mainDiv.appendChild(rangesTitleDiv);
			mainDiv.appendChild(dimInputDiv);
			mainDiv.appendChild(rangesList);
			return mainDiv;
	},
	getAttributeRangesList : function(attributeId){
		var jsonData = requestHandler.getAttributeRangesData(attributeId);
		var mainDiv = document.createElement('div');
			mainDiv.setAttribute('class','col-xs-12 attributeRangesDiv');
			mainDiv.setAttribute('id','attributeRangesDiv'+attributeId);
		var data = $.parseJSON(jsonData);
			for(var i=0; i<data.length; i++){
				var rangeHtml = this.getAttributeRangeHtml(data[i]);
				mainDiv.appendChild(rangeHtml);
			}
		var addRangeButtonDiv = document.createElement('div');
			addRangeButtonDiv.setAttribute('class','row');
			addRangeButtonDiv.setAttribute('id','addRangeButtonDiv'+attributeId);
		var addRangeButton = document.createElement('div');
			addRangeButton.setAttribute('class','col-xs-3 col-offset-2 btn btn-success addRangeButton');
			addRangeButton.setAttribute('id','addRangeButton'+attributeId);
			addRangeButton.setAttribute('onclick','cats.showAddRangeHtml('+attributeId+')');
			addRangeButton.innerHTML = 'დამატება';
			addRangeButtonDiv.appendChild(addRangeButton);
			mainDiv.appendChild(addRangeButtonDiv);
		return mainDiv;
	},

	getAttributeRangeHtml : function(data){
		var max      = requestHandler.getRangesCount(data['attr_ID']);
		var range_ID = data['rng_ID'];
		var attr_ID  = data['attr_ID'];
		var mainDiv = document.createElement('div');
			mainDiv.setAttribute('class','row range_item');
			mainDiv.setAttribute('id','rangeDiv'+range_ID);
		var titleDiv = document.createElement('div');
			titleDiv.setAttribute('class','col-xs-3 col-offset-2 btn btn-info range_title');
			titleDiv.setAttribute('id','rangeTitle'+range_ID);
			titleDiv.setAttribute('onclick','cats.showEditRangeHtml('+range_ID+')');
			titleDiv.innerHTML = data['rng_name'];
		var controlsDiv = document.createElement('div');
			controlsDiv.setAttribute('class','col-xs-6 rangeControlButtons');
		var upSpan = document.createElement('span');
			if(data['ord']!=1){
				upSpan.setAttribute('class','fa fa-long-arrow-up fa-2x');
				upSpan.setAttribute('onclick','cats.updateRangeOrder('+attr_ID+','+range_ID+',-1)');
			}else{
				upSpan.setAttribute('class','fa fa-2x');
			}
		var downSpan = document.createElement('span');
			if(data['ord']!=max){
				downSpan.setAttribute('class','fa fa-long-arrow-down fa-2x');
				downSpan.setAttribute('onclick','cats.updateRangeOrder('+attr_ID+','+range_ID+',1)');
			}else{
				downSpan.setAttribute('class','fa fa-2x');
			}
		var deleteSpan = document.createElement('span');
			deleteSpan.setAttribute('class','fa fa-remove fa-2x');
			deleteSpan.setAttribute('onclick','cats.deleteRange('+attr_ID+','+range_ID+')');
			controlsDiv.appendChild(upSpan);
			controlsDiv.appendChild(downSpan);
			controlsDiv.appendChild(deleteSpan);
			mainDiv.appendChild(titleDiv);
			mainDiv.appendChild(controlsDiv);
			return mainDiv;
	},
	getAttributeHtml : function(attributeData){
		var attributeId     = attributeData['cat_attr_ID'];
		var attributeTitle  = attributeData['title'];
		var catID           = attributeData['cat_ID'];
		var attributesCount = requestHandler.getAttributesCount(attributeData['cat_ID']);
		var itemDiv = document.createElement("div");
			itemDiv.setAttribute('class','row attribute_item');
			itemDiv.setAttribute('id','item'+attributeId);
		var attributeTitleDiv = document.createElement("div");
			attributeTitleDiv.setAttribute('class','col-xs-6 col-offset-2 btn btn-primary attribute_title');
			attributeTitleDiv.setAttribute('onclick','cats.showEditAttributeHtml('+attributeId+')');
			attributeTitleDiv.setAttribute('id','attributeTitleButton'+attributeId);
			attributeTitleDiv.innerHTML = attributeTitle;
		var attributeBodyDiv = document.createElement("div");
			attributeBodyDiv.setAttribute('class','col-xs-6');
		var arrowUpSpan = document.createElement('span');
			if(attributeData['ord']!=1){
				arrowUpSpan.setAttribute('class','fa fa-long-arrow-up fa-2x');
				arrowUpSpan.setAttribute('onclick','cats.updateAttributeOrder('+catID+','+attributeData['cat_attr_ID']+',-1)');
			}else{
				arrowUpSpan.setAttribute('class','fa fa-2x');
			}
		var arrowDownSpan = document.createElement('span');
			if(attributesCount!=attributeData['ord']){
				arrowDownSpan.setAttribute('class','fa fa-long-arrow-down fa-2x');
				arrowDownSpan.setAttribute('onclick','cats.updateAttributeOrder('+catID+','+attributeData['cat_attr_ID']+',1)');
			}else{
				arrowDownSpan.setAttribute('class','fa fa-2x');
			}
		var editSpan = document.createElement('span');
			editSpan.setAttribute('class','fa fa-pencil fa-2x');
		var deleteSpan = document.createElement('span');
			deleteSpan.setAttribute('class','fa fa-remove fa-2x');
			deleteSpan.setAttribute('onclick','cats.deleteAttribute('+catID+','+attributeData['cat_attr_ID']+')');
			attributeBodyDiv.appendChild(arrowUpSpan);
			attributeBodyDiv.appendChild(arrowDownSpan);
			attributeBodyDiv.appendChild(editSpan);
			attributeBodyDiv.appendChild(deleteSpan);
			itemDiv.appendChild(attributeTitleDiv);
			itemDiv.appendChild(attributeBodyDiv);
			return itemDiv;
	},
	showAddAttributeHtml : function(id){
		var attributesListDiv = document.getElementById('attributes_list'+id);
		var addAttributeDiv = document.createElement("div");
			addAttributeDiv.setAttribute('class','row createAttribute');
			addAttributeDiv.setAttribute('id','createAttributeDiv'+id);
		var addAttributeForm = document.createElement('form');
			addAttributeForm.setAttribute('id','createAttributeForm'+id);
		var titleInputDiv = document.createElement('div');
			titleInputDiv.setAttribute('class','col-xs-6');
		var titleDescriptionSpan = document.createElement('span');
			titleDescriptionSpan.innerHTML = 'დასახელება';
		var titleInput = document.createElement('input');
			titleInput.setAttribute('type','text');
			titleInput.setAttribute('name','title');
			titleInput.setAttribute('class','form-control');
			titleInput.setAttribute('required','required');
			titleInputDiv.appendChild(titleDescriptionSpan);
			titleInputDiv.appendChild(titleInput);
		var typeSelectDiv = document.createElement('div');
			typeSelectDiv.setAttribute('class','col-xs-4');
		var typeSelectDescriptionSpan = document.createElement('span');
			typeSelectDescriptionSpan.innerHTML = 'ტიპი';
		var typeSelect = document.createElement('select');
		 	typeSelect.setAttribute('name','type');
		 	typeSelect.setAttribute('class','form-control');
		var typeOption1 =  document.createElement('option');
			typeOption1.setAttribute('value','1');
			typeOption1.innerHTML ='კი/არა';
		var typeOption2 = document.createElement('option');
			typeOption2.setAttribute('value','2');
			typeOption2.innerHTML = 'ფიქსირებული მნიშვნელობა';
		var typeOption3 = document.createElement('option');
			typeOption3.setAttribute('value','3');
			typeOption3.innerHTML = 'რიცხვითი მნიშვნელობა';
			typeSelect.appendChild(typeOption1);
			typeSelect.appendChild(typeOption2);
			typeSelect.appendChild(typeOption3);
			typeSelectDiv.appendChild(typeSelectDescriptionSpan);
			typeSelectDiv.appendChild(typeSelect);
		var questionDiv = document.createElement('div');
			questionDiv.setAttribute('class','col-xs-2');
		var questionSpan = document.createElement('span');
			questionSpan.setAttribute('class','fa fa-question fa-2x attributeQuestionButton');
			questionSpan.setAttribute('onclick','cats.showAttributeTypesInformation()');
			questionDiv.appendChild(questionSpan);
		var addAttributeActionButtonDiv = document.createElement('div');
			addAttributeActionButtonDiv.setAttribute('class','col-xs-12 addAttributeActionButton');
			addAttributeActionButtonDiv.setAttribute('id','addAttributeActionButtonDiv'+id);
		var addAttributeActionButton =  document.createElement('button');
			addAttributeActionButton.setAttribute('class','btn btn-success');
			addAttributeActionButton.setAttribute('type','button');
			addAttributeActionButton.setAttribute('onclick','cats.addAttribute('+id+')');
			addAttributeActionButton.innerHTML = 'დამატება';
			addAttributeActionButtonDiv.appendChild(addAttributeActionButton);
			addAttributeForm.appendChild(titleInputDiv);
			addAttributeForm.appendChild(typeSelectDiv);
			addAttributeForm.appendChild(questionDiv);
			addAttributeForm.appendChild(addAttributeActionButtonDiv);
			addAttributeDiv.appendChild(addAttributeForm);
			attributesListDiv.appendChild(addAttributeDiv);
		var addButton = document.getElementById('addAttributeButton'+id);
			addButton.setAttribute('class','col-xs-6 col-offset-2 btn btn-default addAttributeButton');
			addButton.innerHTML = 'გაუქმება';
			addButton.setAttribute('onclick','cats.hideAddAttributeHtml('+id+')');
	},
	hideAddAttributeHtml : function(id){
		var addAttributeDiv = document.getElementById('createAttributeDiv'+id);
			$(addAttributeDiv).remove();
		var addButton = document.getElementById('addAttributeButton'+id);
			addButton.setAttribute('class','col-xs-6 col-offset-2 btn btn-success addAttributeButton');
			addButton.setAttribute('onclick','cats.showAddAttributeHtml('+id+')');
			addButton.innerHTML = 'დამატება';
	},
	updateAttributeOrder : function(cat_ID,attr_ID,update_type){
		requestHandler.updateAttributeOrder(attr_ID,update_type);
		var attributesListDiv = document.getElementById('attributes_list'+cat_ID);
			attributesListDiv.innerHTML = '';
		var attributesListHtml = this.getAttributesList(cat_ID);
			$( attributesListDiv ).replaceWith( attributesListHtml );
			alertify.success('ატრიბუტების რიგი წარმატებით შეიცვალა');
	},
	getAddAttributeButton : function(id){
		var addAttributeDiv = document.createElement("div");
			addAttributeDiv.setAttribute("class","row");
		var addAttributeDivInner = document.createElement("div");
			addAttributeDivInner.setAttribute('class','col-xs-6 col-offset-2 btn btn-success addAttributeButton');
			addAttributeDivInner.setAttribute('onclick','cats.showAddAttributeHtml('+id+')');
			addAttributeDivInner.setAttribute('id','addAttributeButton'+id);
			addAttributeDivInner.innerHTML = 'დამატება';
			addAttributeDiv.appendChild(addAttributeDivInner);
			return addAttributeDiv;
	},
	getCategoryTitleAndIcon : function(catData){
		var id   = catData['cat_ID'];
		var icon = catData['icon'];
		var titleAndIconDiv = document.createElement("div");
			titleAndIconDiv.setAttribute('class','row');
			titleAndIconDiv.setAttribute('id',''+id);
		var iconDiv = document.createElement('div');
			iconDiv.setAttribute('class','col-md-1 col-sm-12 EditIconDiv'+id);
		var iconDivInner = document.createElement('i');
			iconDivInner.setAttribute('class',catData['icon']+' fa-4x EditIconBox'+id);
			iconDivInner.setAttribute('id','EditableIcon'+id);
			iconDivInner.setAttribute('onclick','cats.showEditIconHtml('+id+',"'+icon+'")');
		iconDiv.appendChild(iconDivInner);
		var titleDiv = document.createElement('div');
			titleDiv.setAttribute('class','col-md-10 col-sm-12');
			titleDiv.setAttribute('style','font-size:29px;');
			titleDiv.setAttribute('onclick','cats.showEditTitleHtml(this,'+id+')');
			titleDiv.innerHTML=catData['title'];
			titleAndIconDiv.appendChild(iconDiv);
			titleAndIconDiv.appendChild(titleDiv);
			return titleAndIconDiv;
	},
	initializeCatsCollapser : function(){
		$('.collapse').on('show.bs.collapse', function() {
        	var id = $(this).attr('id');
        	$('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-faq');
        	$('a[href="#' + id + '"] .panel-title span').html('<i class="glyphicon glyphicon-chevron-up"></i>');
    	});
    	$('.collapse').on('hide.bs.collapse', function() {
        	var id = $(this).attr('id');
        	$('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-faq');
        	$('a[href="#' + id + '"] .panel-title span').html('<i class="glyphicon glyphicon-chevron-down"></i>');
    	});
	},
	getCatsCount : function(){
		return $('.panel-heading').length;
	},
	addAttribute : function(id){
		var attributesListDiv = document.getElementById('attributes_list'+id);
			formHandler.AddAttributeForm(id);
		var newAttributesListDiv = this.getAttributesList(id);
			$( attributesListDiv ).replaceWith( newAttributesListDiv );
	},
	deleteAttribute : function(id,cat_attr_ID){
		alertify.confirm('დარწმუნებული ხართ რომ გნებავთ ამ ატრიბუტის წაშლა?', function (e) {
		    if (e) {
		        var attributesListDiv = document.getElementById('attributes_list'+id);
					requestHandler.deleteAttribute(cat_attr_ID);
				var newAttributesListDiv = cats.getAttributesList(id);
					$( attributesListDiv ).replaceWith( newAttributesListDiv );
					alertify.success('ატრიბუტი წარმატებით წაიშალა');
		    }
		});
	},
	deleteCat : function(cat_ID){
		alertify.confirm('დარწმუნებული ხართ რომ გნებავთ ამ კატეგორიის წაშლა?(წაიშლება ყველა მონაცემი)', function (e) {
		    if (e) {
		        var catsDiv = document.getElementById('cats');
				requestHandler.deleteCat(cat_ID);
				catsDiv.innerHTML = '';
				var data = requestHandler.getCats();
		    	if(data!=null){
		    		cats.showCats(data);
		    		cats.initializeCatsCollapser();
		    	}
			alertify.success('კატეგორიების რიგი წარმატებით შეიცვალა');
		    }
		});
	},
	updateCatOrder : function(cat_ID,update_type){
		var catsDiv = document.getElementById('cats');
			requestHandler.updateCatOrder(cat_ID,update_type);
			catsDiv.innerHTML = '';
		var data = requestHandler.getCats();
		    	if(data!=null){
		    		cats.showCats(data);
		    		cats.initializeCatsCollapser();
		    	}
			alertify.success('კატეგორიების რიგი წარმატებით შეიცვალა');
	},
	updateRangeOrder : function(attributeId,rangeId,value){
		var rangesDiv = document.getElementById('rangesDiv'+attributeId);
			requestHandler.updateRangeOrder(rangeId,value);
		var newRangesDiv = this.getAttributeRanges(attributeId);
			$( rangesDiv ).replaceWith( newRangesDiv );
			alertify.success('პარამეტრების რიგი წარმატებით შეიცვალა');

	},
	addRange : function(attributeId){
		var rangesDiv = document.getElementById('rangesDiv'+attributeId);
			formHandler.addRangeForm(attributeId);
		var newRangesDiv = cats.getAttributeRanges(attributeId);
		$( rangesDiv ).replaceWith( newRangesDiv );
		alertify.success('პარამეტრი წარმატებით დაემატა');
	},
	editRange : function(rangeId){
		var rangeData = requestHandler.getRangeData(rangeId);
		var data = $.parseJSON(rangeData)[0];
		var rangesDiv = document.getElementById('rangesDiv'+data['attr_ID']);
			formHandler.editRangeForm(rangeId);
		var newRangesDiv = cats.getAttributeRanges(data['attr_ID']);
		$( rangesDiv ).replaceWith( newRangesDiv );
		alertify.success('პარამეტრი წარმატებით შეიცვალა');
	},
	deleteRange : function(attributeId,rangeID){
		alertify.confirm('დარწმუნებული ხართ რომ გნებავთ ამ პარამეტრის წაშლა?', function (e) {
		    if (e) {
			var rangesDiv = document.getElementById('rangesDiv'+attributeId);
	    			requestHandler.deleteRange(rangeID);
	    		var newRangesDiv = cats.getAttributeRanges(attributeId);
	    			$( rangesDiv ).replaceWith( newRangesDiv );
	    			alertify.success('პარამეტრი წარმატებით წაიშალა');
		    }
		});
	},
	editAttribute : function(attributeId){
		var editAttributeDiv = document.getElementById('editAttributeDiv'+attributeId);
		var jsonData = requestHandler.getAttributeData(attributeId);
		var attributeData = $.parseJSON(jsonData)[0];
		var attributesListDiv = document.getElementById('attributes_list'+attributeData['cat_ID']);
			formHandler.EditAttribute(attributeId);
			editAttributeDiv.innerHTML = '';
			$(attributesListDiv).remove();
		var attributesListTitle= document.getElementById('attributes_title'+attributeData['cat_ID']);
		var attributesList = this.getAttributesList(attributeData['cat_ID']);
			$(attributesListTitle).after(attributesList);

	},
	updateAttributeDim : function(attributeId){
		var rangesDiv = document.getElementById('rangesDiv'+attributeId);
		var dimInput = document.getElementById('dimInput'+attributeId);
		var value = $(dimInput).val();
		requestHandler.updateAttributeDim(attributeId,value);
		var newRangesDiv = this.getAttributeRanges(attributeId);
		$( rangesDiv ).replaceWith( newRangesDiv );
		alertify.success('განზომილება წარმატებით შეიცვალა');
	},
	addAttributeValue : function(attributeId){
		var mainDiv = document.getElementById('attributeValuesDiv'+attributeId);
			formHandler.addAttributeValue(attributeId);
		var newMainDiv = this.getAttributeValues(attributeId);
			$(mainDiv).replaceWith(newMainDiv);
			alertify.success('ატრიბუტის მნიშნველობა წარმატებით დაემატა');
	},
	deleteAttributeValue : function(attributeId,cat_attr_value_ID){
		alertify.confirm('დარწმუნებული ხართ რომ გნებავთ ამ ატტრიბუტის მნიშვნელობის წაშლა?', function (e) {
		    if (e) {
			var mainDiv = document.getElementById('attributeValuesDiv'+attributeId);
	    			requestHandler.deleteAttributeValue(cat_attr_value_ID);
	    		var newMainDiv = cats.getAttributeValues(attributeId);
	    			$( mainDiv ).replaceWith( newMainDiv );
	    			alertify.success('ატტრიბუტის მნიშვნელობა წარმატებით წაიშალა');
		    }
		});
	},
	editAttributeValue : function(attributeId,cat_attr_value_ID){
		var mainDiv = document.getElementById('attributeValuesDiv'+attributeId);
			formHandler.editAttributeValue(cat_attr_value_ID);
		var newMainDiv = this.getAttributeValues(attributeId);
			$(mainDiv).replaceWith(newMainDiv);
			alertify.success('ატრიბუტის მნიშნველობა წარმატებით შეიცვალა');
	},
};
