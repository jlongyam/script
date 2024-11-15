// IE_9+, no less!
;(function(w,d,c) {
  if( typeof script === 'undefined' ) script = {};
  script.test = function( option, to_object ) {
    var
      config = {
        name: option.name || 'Test',
        call: option.call ? option.call() : 0,
        should: typeof option.should === 'boolean' ? option.should.toString() : option.should || '0'
      },
      result = {
        test: config.name,
        should: config.should,
        pass: (config.should.toString() === config.call.toString())
      }
    ;
    if( to_object ) return result;
    else {
      if( typeof JSON !== 'undefined' ) return JSON.stringify( result, 0, 2 );
      else {
        var s = '';
        for( k in result ) s += k+': '+result[k]+'\n'
        return s;
      }
    }
  };
  script.current = function() { return d.scripts[d.scripts.length-1] };
  script.internal = script.current();
  script.path = { file: script.internal.getAttribute('src') };
  script.path.dir = script.path.file.replace('script.js','');
  script.path.base = (function(){
    var
      element = (function() {
        var base = d.getElementsByTagName('base')[0];
        if(base) return base.getAttribute('href');
        else return false;
      }()),
      href = location.href.replace('file://',''),
      relative = (function() {
        if(element) {
          var
            i_element = element.split('/').length,
            a_href = href.split('/'), a_result = [],
            i
          ;
          for( i = 0; i < a_href.length - i_element; i++ ) a_result.push(a_href[i]);
          return a_result.join('/')+'/';
        }
        else return href;
      }()),
      rest = href.substring(relative.length),
      actual = rest.substring(0,rest.lastIndexOf('/')+1)
    ;
    return {
      element: element,
      href: href,
      relative: relative,
      rest: rest,
      actual: actual
    };
  }());
  script.loaded = [];
  script.load = function(url, id) {
    var base = script.path.base;
    if(base.element) url = base.actual + url;
    var url_absolute = (function() {
      var link = d.createElement('link');
      link.disabled = 'disabled';
      link.href = url
      d.head.appendChild(link);
      link.parentNode.removeChild(link);
      return link.href
    })();
    if( script.loaded.indexOf(url_absolute) >= 0 ) return;
    else {
      script.loaded.push(url_absolute);
      var
        head = d.getElementsByTagName('head')[0],
        file_type = url.split('.').pop()
      ;
      if(file_type === 'js') {
        var new_script = d.createElement('script');
        new_script.src = url;
        //new_script.onload = function() { head.removeChild(new_script) }
        head.appendChild(new_script);
      }
      if(file_type === 'css') {
        var new_link = d.createElement('link');
        new_link.rel = 'stylesheet';
        if(id) new_link.id = id;
        new_link.href = url;
        head.insertBefore( new_link, d.scripts[0] );
      }
    }
  };
  function script(args){
    if(args) var name = args.name, require = args.require;
    if(name && (name in w) ) w.addEventListener( 'load', w[name], false );
    if(require) {
      var has_map = ( script.map !== undefined )
      if(typeof require === 'string' ) {
        if(has_map && (require in script.map) ) require = script.map[require]
        script.load(require);
      }
      else {
        for( i in require ) {
          var url =  require[i];
          if(has_map && (url in script.map) ) url = script.map[url];
          script.load(url);
        }
      }
    }
  }
  w.script = script;
  // debug
  script.load(script.path.dir+'optional/console/console.css');
  document.write('<script src="'+script.path.dir+'optional/console/console.js"><\/script>');
}(window,document))
