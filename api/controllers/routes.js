import express from 'express';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

// Find Routes
// const routes = fs.readdirSync('./');
// const routes = _.without(path.basename('./', '.js'), 'router');

console.log(routes);

const router = express.Router();

// router.use('/api/dummy', routes);

export default routes;