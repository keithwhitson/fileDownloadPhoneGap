

    // Wait for Cordova to connect with the device
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // Cordova is ready to be used!
    //
    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT,0,gotFS,onFail);
    }
    
    function gotFS(fileSystem){
    	alert("filesystem successful");
    	fileSystem.root.getFile("dummy.html",{create:true, exclusive:false},gotFileEntry, onFail);
    }
    
    function gotFileEntry(fileEntry){
    	alert("fileEntry was successful");
    	fileEntry.file(gotFile,onFail);
    	var sPath = fileEntry.fullPath.replace("dummy.html","");
    	alert("This" + sPath);
    	var fileTransfer = new FileTransfer();
    	fileEntry.remove();
    	
    	var uri = encodeURI("http://keithwhitson.biz/testCordova/test.txt");
    	
    	fileTransfer.download(
    		uri,
    		sPath + "thetext.txt",
    		function(entry){
    			console.log("download complete: " + entry.fullPath);
    		},
    		
    		function(error){
    			console.log("download error source" + error.source);
    			console.log("download error target" + error.target);
    			console.log("upload error code" + error.code);
    		}
    		
    	);
    }
    
    
    
    function gotFile(file){
    	alert("gotFile successful");
    	readDataUrl(file);
    	readText(file);
    }
    
    function readDataUrl(file){
    	alert("readdateurl function is being called");
    	var reader = new FileReader();
    	reader.onloadend = function(evt){
    		alert("Read as data URL");
    		alert(evt.target.result);
    	};
    	
    	reader.readAsDataURL(file);
    }
    
    function readText(file){
    	alert("readastext function is being called");
    	var reader = new FileReader();
    	reader.onloadend = function(evt){
    		alert("Read as data Text");
    		alert(evt.target.result);
    	};
    	
    	reader.readAsText(file);
    }
	
	// Called if something bad happens.
    // 
    function onFail(message) {
      alert('Finding File Failed');
    }
    
