var paths = [
];

var apiStart = 'http://localhost:8080/api/filename'
var hierarchy;

function createHierarchy() {
    hierarchy = paths.reduce(function(hier,path){
    var x = hier;	
	
    path.split('/').forEach(function(item){
		
        if(!x[item]){
            x[item] = {};
        }
        x = x[item];
    });
    x.path = path;
    return hier;
}, {});
}

var makeul = function(hierarchy, classname){
    var dirs = Object.keys(hierarchy);
    var ul = '<ul';
    if(classname){
        ul += ' path="' + classname + '"';
    }
    ul += '>\n';
    dirs.forEach(function(dir){	
		var path = hierarchy[dir].path;
        if(path){ // file	
            ul += '<li class="file" data-url="' + path + '">' + dir + '</li>\n';
        }else{
			var cln = classname;
			if(cln != "") {
				cln += '/'
			}
			cln += dir
			
            ul += '<li class="folder">' + dir + '\n';
            ul += makeul(hierarchy[dir], cln);
            ul += '</li>\n';
        }
    });
    ul += '</ul>\n';
    return ul;
};

function getAllPaths(){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
			var resp = this.response;
            console.log(resp);
			resp.forEach(function(item, i, arr) {
				paths.push(item.fn)
			});
			console.log(paths, 'paths')
			showPathsTree();
        }
    };

	request.responseType = 'json';
    request.open('GET', apiStart+'/');
    request.send();
}

function createPath(){
    var request = new XMLHttpRequest();	

	var fn = document.getElementById('fn')

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
			getAllPaths();
			fn.value = ''
        }
    };

	request.responseType = 'json';
    request.open('POST', apiStart+'/');
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({ "fn": fn.value }));
}

function showPathsTree() {	
		console.log('showPathsTree');
		createHierarchy();
		document.getElementById('demo').innerHTML = makeul(hierarchy, '');
}

function submitForm() {
	createPath()
}