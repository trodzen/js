/* ------------------------------------------------------------------------------- 
	Get browser type
	1 = netscape (other versions)
	2 = netscape ver 7, Gecko
	3 = explorer
	4 = opera
	5 = other
------------------------------------------------------------------------------- */
var browser_type = 0;
if(navigator.userAgent.indexOf("Netscape") != -1 ) {
	if(navigator.userAgent.indexOf("7") != -1) {
		browser_type = 2; }
	else {
		browser_type = 1; }
	}
else if(navigator && navigator.userAgent && navigator.userAgent.indexOf && navigator.userAgent.indexOf('Gecko') != -1) {
	browser_type = 2; }
else if(navigator.userAgent.indexOf("MSIE") != -1) {
	browser_type = 3; }
else if(navigator.userAgent.indexOf("Opera") != -1) {
	browser_type = 4; }
else {
	browser_type = 5; }

/* ------------------------------------------------------------------------------- 
	Open a service window
	PARMS:	url, width, height
------------------------------------------------------------------------------- */
function openServiceWindow(url, wide, high, mywin) {
	var wtop = (screen.height - high) / 2;
	var wleft = (screen.width - wide) / 2;
	var specs = 'resizable=1,scrollbars=1,status=0,location=0,toolbar=0,menubar=0,width=' + wide + ',height=' + high + ',top=' + wtop + ',left=' + wleft;

	win = window.open(url,mywin,specs);
	if (parseInt(navigator.appVersion) >= 4) {
		win.window.focus(); }
	}

/* ------------------------------------------------------------------------------- 
	Check and Uncheck all checkboxes
------------------------------------------------------------------------------- */
var checkflag = "false";
function check(field) {
	if (checkflag == "false") {
  	for (i = 0; i < field.length; i++) {
  		field[i].checked = true;}
  	checkflag = "true";
  	return "Uncheck all"; }
	else {
		for (i = 0; i < field.length; i++) {
			field[i].checked = false; }
  	checkflag = "false";
  	return "Check all"; }
	}

function uncheck(field) {
	if (checkflag == "true") {
  	for (i = 0; i < field.length; i++) {
  		field[i].checked = true;}
  	checkflag = "false";
  	return "Uncheck all"; }
	else {
		for (i = 0; i < field.length; i++) {
  		field[i].checked = false; }
  	checkflag = "true";
  	return "Check all"; }
	}

/* ------------------------------------------------------------------------------- 
	Select redio button
------------------------------------------------------------------------------- */
function selectradio(mybutton, index) {
	if (mybutton.length > 1) {
		if (mybutton[index].checked == true) {
			if (mybutton[index].type != "radio") {
				mybutton[index].checked = false; }
			}
		else {
			mybutton[index].checked = true; }
		}
	else {
		if (mybutton.checked == true) {
			if (mybutton.type != "radio") {
				mybutton.checked = false; }
			}
		else {
			mybutton.checked = true; }
		}
	}

/* ------------------------------------------------------------------------------- 
	Select drop down list
------------------------------------------------------------------------------- */
function selectlist(form,myname,pVal) {
	form.cmd_list.value=myname;
	var setSelectlist = document.getElementById('value_' + myname);
	setSelectlist.value=pVal;
	form.submit();
	}

/* ------------------------------------------------------------------------------- 
	Select Schedule
------------------------------------------------------------------------------- */
function setSchedule_Name(myvalue) {
	form.Schedule_Name.value=myvalue;
	}

/* ------------------------------------------------------------------------------- 
	Set the default focus
------------------------------------------------------------------------------- */
function init() {
	var arrIN = document.getElementsByTagName("input");
	if (document.forms[0]) {
		for(var j = 0 ; j < arrIN.length ; j++) {
			if ((arrIN[j].type != "hidden") && (arrIN[j].type != "image") && (arrIN[j].type != "text")) {
				return; }
			if ((arrIN[j].type == "text") && (arrIN[j].name != "email")) {
				if ((arrIN[j].name == "login") && (arrIN[j].value != "")) {
					var k = j + 1;
					if (arrIN[k].name == "password") {
					self.focus();
					arrIN[k].focus();
					return; } }
				self.focus();
				arrIN[j].focus();
				return; }
			}
		}
	}

/* ------------------------------------------------------------------------------- 
	Start the html editor
------------------------------------------------------------------------------- */
var editor_width = 700;
var editor_height = 350;
function startEditor(myname,setFrom) {

	if(setFrom) {
		var setEditor = document.getElementById('setEditor_' + myname);
		var from_element = document.getElementById(setFrom);
		if((!setEditor.value) && (from_element.value)) {
			setEditor.value = from_element.value; }
		}

	page_content='<IFRAME name="editor_' + myname + '" id="editor_' + myname + '" src="/bin/editor/editor.cfm?hid=setEditor_' + myname + '&editor_width=' + editor_width + '&editor_height=' + editor_height + '&flg=1" scrolling=no width=' + editor_width + ' height=' + editor_height + ' frameborder=0></IFRAME>';

	var div_element = document.getElementById('div_' + myname);
	div_element.innerHTML = '';
	div_element.innerHTML = page_content; }
	
/* ------------------------------------------------------------------------------- 
	Get the editor content
------------------------------------------------------------------------------- */
function getEditorContent() {
	var temp_content = "";
	var IFname = '';
	var arrIF = document.getElementsByTagName("iframe");
	
	if(arrIF.length) {
		for(var j = 0 ; j < arrIF.length ; j++) {
			if(arrIF[j].id.indexOf('editor') != -1) {
				IFname = arrIF[j].id;
				var arrIFname = IFname.split("_");
				myname = 'getEditor_' + arrIFname[1];
				if(!gethtml(eval(arrIF[j].id),document.getElementById(myname))) {
					return false; }
				}
			}
		}
		return true; }
	
function gethtml(l_obj_frame,getEditor) {
	if (!l_obj_frame.isHTMLMode()) {
		return false; }
	if(browser_type == 2) {
		l_obj_frame.close_child(); }
	getEditor.value = l_obj_frame.htmlContent();
	return true; }