import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
   const token = req.cookies.accessToken

   if (!token) {
      return res.status(401).json({ success: false, message: "You are not authorize!" })
   }

   // if token is exist then verify the token
   jwt.verify(token, "gahg48589a4589ajfjAUFAHHFIhufuu", (err, user) => {
      if (err) {
         return res.status(401).json({ success: false, message: "Token is invalid" })
      }

      req.user = user
      next()
   })
}


export const verifyUser = (req, res, next) => {
   verifyToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.role === 'admin') {
         next()
      } else {
         return res.status(401).json({ success: false, message: "You are not authenticated" })
      }
   })
}


export const verifyAdmin = (req, res, next) => {
   const { email, password } = req.body;
 
   // Check if the email and password match the admin credentials
   if (email === 'admin@gmail.com' && password === 'admin') {
     next();
   } else {
     res.status(403).json({ message: 'Forbidden: Access is denied.' });
   }
 };
 