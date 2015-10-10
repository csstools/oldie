var assign  = require('object-assign');
var postcss = require('postcss');

var processors = [
	{
		plugin:    require('postcss-calc'),
		namespace: 'calc',
		defaults:  {}
	},
	{
		plugin:    require('postcss-unmq'),
		namespace: 'media',
		defaults:  {}
	},
	{
		plugin:    require('postcss-unroot'),
		namespace: 'root',
		defaults:  {}
	},
	{
		plugin:    require('postcss-unnth'),
		namespace: 'nth',
		defaults:  {}
	},
	{
		plugin:    require('postcss-unnot'),
		namespace: 'not',
		defaults:  {}
	},
	{
		plugin:    require('postcss-unopacity'),
		namespace: 'opacity',
		defaults:  {}
	},
	{
		plugin:    require('postcss-unrgba'),
		namespace: 'rgba',
		defaults:  {}
	},
	{
		plugin:    require('pixrem'),
		namespace: 'rem',
		defaults:  {
			replace: true
		}
	},
	{
		plugin:    require('postcss-pseudoelements'),
		namespace: 'pseudo',
		defaults:  {}
	}
];

module.exports = postcss.plugin('oldie', function (opts) {
	opts = assign({}, opts);

	var instance = postcss();

	processors.forEach(function (processor) {
		var namespaceOptions = processor.namespace in opts ? opts[processor.namespace] : opts;
		var processorOptions = {};

		processorOptions = assign({}, processor.defaults, namespaceOptions);

		if (namespaceOptions && !processorOptions.disable) {
			instance.use(processor.plugin(processorOptions));
		}
	});

	return instance;
});
