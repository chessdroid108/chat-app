var loader =  { 
    _load: function(_theme, _type){
        code = (function(type){
            if (type == "css") {
                return ['<link rel="stylesheet" href="', '"></link>'];
            } else if (type == "js") {
                return ['<script src="', '"></script>'];
            }
        })(_type)
        return code[0] + this.url(_theme, _type) + code[1];
        },
    url:function(_theme, _type){
        return "Assets/Theme/" + _theme + "." + _type
    },

    load:function(theme) {
        css = this._load(theme, "css");
        js = this._load(theme, "js");
        $('head').append(css);
        $('head').append(js);
    }
}