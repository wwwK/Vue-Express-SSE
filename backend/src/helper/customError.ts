interface expressMiddware {
  (res: any, msg: string, err?: null): any
}

export const badRequest: expressMiddware = (res, msg, err = null) => {
  if (err) {
    console.debug('err', err)
  };

  return res.status(400).json({
    success: false,
    message: msg,
  });
}
  
export const unAuthorized: expressMiddware = (res, msg) => {
  return res.status(401).json({
    success: false,
    message: msg,
  });
}