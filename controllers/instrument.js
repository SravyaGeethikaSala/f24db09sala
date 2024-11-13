var instrument = require('../models/instrument');
// List of all instruments
exports.instrument_list = function(req, res) {
 res.send('NOT IMPLEMENTED: instrument list');
};
// for a specific instrument.
exports.instrument_detail = function(req, res) {
 res.send('NOT IMPLEMENTED: instrument detail: ' + req.params.id);
};
// Handle instrument create on POST.
exports.instrument_create_post = function(req, res) {
 res.send('NOT IMPLEMENTED: instrument create POST');
};
// Handle instrument delete from on DELETE.
exports.instrument_delete = function(req, res) {
 res.send('NOT IMPLEMENTED: instrument delete DELETE ' + req.params.id);
};
// Handle instrument update form on PUT.
exports.instrument_update_put = function(req, res) {
 res.send('NOT IMPLEMENTED: instrument update PUT' + req.params.id);
};
