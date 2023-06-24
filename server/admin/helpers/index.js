const slugify = require('slugify');

exports.verifyBodyParams = (bodyParamsToVerify, requestBody) => {
  const missingBodyParams = bodyParamsToVerify.filter(
    (key) => !Object.keys(requestBody).includes(key) && !requestBody[key]
  );

  if (missingBodyParams.length > 0) {
    return {
      message: `Following Keys are missing: ${missingBodyParams.join(', ')}`,
      error: missingBodyParams,
    };
  }
  return {
    error: false,
    message: 'Request parameters are valid',
  };
};

exports.generateSlug = (string) =>
  slugify(string, {
    replacement: '-',
    lower: true,
    trim: true,
  });
