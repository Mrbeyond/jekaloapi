
module.exports ={
  /** The 200 response method */
  success: (res, data)=>{
    return res.status(200).json({
      ...data,
      // error: false
    })
  },

  /** Thw 201 successfully created method */
  created: (res, load=null)=>{
    let data= {
      error: false,
      message: "Successfully Created",
    }
    if(load){
      data.data= load
    }
    return res.status(201).json(data)
  },

  /** The customized Intruder error response for high security purpose */
  badRequest: (res, load=null)=>{
    return res.status(400).json({
      message: load,
      type:"Bad request",
      error: true
    })
  },

  /** The customized error for unauthorized requests */
  unauthorized: (res)=>{
    return res.status(401).json({
      message: 'Unauthoried request, Please login',
      error: true
    })
  },

  /** The internal 500 Error response */
  internal: (res)=>{
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    })
  },

  /** The page not found  404 Error response */
  notFound: (res, msg=null)=>{
    return res.status(404).json({
      error: true,
      message: msg? msg: "Resources not Found",
    })
  },

  /** Forbidden Error response */
  forbidden: (res, msg=null)=>{
    return res.status(403).json({
      error: true,
      message: msg? msg:"Request forbidden",
    })
  },
}