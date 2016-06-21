var TokenGenerator = require( 'token-generator' )({
        salt: 'bacon is life',
        timestampMap: 'a1c2e3g4i5' // 10 chars array for obfuscation proposes
    });

function getProfileSalt(p){
  p = parseInt(p);
  switch (p) {
    case 1:
      return '0r1o2o3t45'
      break;
    case 2:
      return '9a8d7m6i5n'
      break;
    case 3:
      return 'b5a6l7c1a0'
      break;
      break;
    default:
      return '6s6a6l1a1o'
      break;
  }
}


function verifiesPermission (token, profiles){
	var profile = String(token).substring(14)
  for(i in profiles){
  	if(profile == profiles[i]){
  		return true
  	}
  }
  return false;
}

exports.validtoken = function(req, res, next){
  var token = req.get("token");
  var profiles = req.profiles;

  if (token == null)
    return false

  TokenGenerator.options.salt = getProfileSalt(String(token).substring(14));
  if(!TokenGenerator.isValid(String(token).substring(0,14)))
    return res.status(400).json({err:"Token inválido!"});

  if(!verifiesPermission(token, profiles))
    return res.status(400).json({err:'Usuário sem permissão para executar função'});

  next();
}

exports.generate = function(profile){
  TokenGenerator.options.salt = getProfileSalt(profile);
  return TokenGenerator.generate() + profile;
}
