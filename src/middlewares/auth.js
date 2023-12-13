import Jwt from "jsonwebtoken";

const authentificateUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ response: "Bad authorization" })
    }


    Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ response: "Bad authorization" })
        }

        req.body.userId = decoded.id

        return next();
    });


}

export default authentificateUser