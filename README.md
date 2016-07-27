# BAEaaS [![Build Status](https://travis-ci.org/BrianMitchL/baeaas.svg?branch=master)](https://travis-ci.org/BrianMitchL/baeaas) [![Dependency Status](https://gemnasium.com/badges/github.com/BrianMitchL/baeaas.svg)](https://gemnasium.com/github.com/BrianMitchL/baeaas)

BAE as a Service

## Installation

`npm install`

## Run

`npm start`

### Content-Types

To use different content types (which can be found in the [server/renderers](https://github.com/BrianMitchL/baeaas/tree/master/server/renderers) directory), use the "Accept" header in your request. Eg. "Accept: application/json"

BAEaaS currently accepts:
 * application/json
 * text/plain
 * text/html

## Attribution
Much of the server configuration was influenced by [FOAAS](https://github.com/tomdionysus/foaas).
