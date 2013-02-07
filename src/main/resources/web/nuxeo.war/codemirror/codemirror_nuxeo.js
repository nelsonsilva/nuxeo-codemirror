function isFullScreen(cm) {
  return /\bCodeMirror-fullscreen\b/.test(cm.getWrapperElement().className);
}

function winHeight() {
  return window.innerHeight || (document.documentElement || document.body).clientHeight;
}

function setFullScreen(cm, full) {
  var wrap = cm.getWrapperElement();
  if (full) {
    wrap.className += " CodeMirror-fullscreen";
    wrap.style.height = winHeight() + "px";
    document.documentElement.style.overflow = "hidden";
  } else {
    wrap.className = wrap.className.replace(" CodeMirror-fullscreen", "");
    wrap.style.height = "";
    document.documentElement.style.overflow = "";
  }
  cm.refresh();
}

CodeMirror.on(window, "resize", function() {
  var showing = document.body.getElementsByClassName("CodeMirror-fullscreen")[0];
  if (!showing) return;
  showing.CodeMirror.getWrapperElement().style.height = winHeight() + "px";
});
  
function getCodeMirrorFor(id) {
  var instances = document.body.getElementsByClassName("CodeMirror");
  var l = instances.length;
  while (--l >= 0) {
    if (id == instances[l].CodeMirror.getTextArea().id) {
      return instances[l].CodeMirror;
    }
  }
  return null;
}

function addCodeMirror(id, mode) {
  if (!mode) { return; }
  
  var editor = getCodeMirrorFor(id);
  
  if (editor) {
	editor.setOption("mode", mode);
    return;
  }
  
  editor = CodeMirror.fromTextArea(document.getElementById(id), {
    mode: mode,
    tabMode: 'indent',
    //lineNumbers: true,
    autoCloseTags: true,
    extraKeys: {
      "F11": function(cm) {
        setFullScreen(cm, !isFullScreen(cm));
       },
       "Esc": function(cm) {
          if (isFullScreen(cm)) setFullScreen(cm, false);
       }
    },
  });
}

function removeCodeMirror(id) {
  var cm = getCodeMirrorFor(id);
  if (cm) { cm.toTextArea(); }
}