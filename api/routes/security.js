const { Router } = require("express");
const ValidationError = require("../errors/ValidationError");
const Joi = require("joi");

module.exports = function (userService) {
  const router = Router();

  router.post("/login", async function (req, res) {
    const { email, password } = req.body;

    try {
      const loginValidation = Joi.object({
        email: Joi.string().email().required().messages({ "*": "Email is required" }),
        password: Joi.string().required().messages({ "*": "Password is required" }),
      })
      const { error } = loginValidation.validate(req.body)
      if (error) throw new ValidationError(error);
      const { user, token } = await userService.login({ email, password });
      if (!user.is_active) {
        return res.sendStatus(401);
      }
      return res.json({ user: user, token });
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: (err.errors && typeof err.errors === 'string') ? err.errors : (err.error?.details && Array.isArray(err.error.details)) ? err.errors.details[0].message : err.message });
    }
  });

  router.post("/register", async function (req, res) {
    try {
      //const { sendMail } = require("../libs/email");
      const newUser = await userService.create(req.body);

      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });

      /*
      sendMail(
        req.body.userData.email,
        "Confirmation de votre demande d'inscription",
        "Merci pour votre inscription. Un de nos conseillers va étudier et confirmer votre demande d'inscription.",
        "Merci pour votre inscription. Un de nos conseillers va étudier et confirmer votre demande d'inscription."
      );*/

      // Répondre avec le nouveau marchand créé
      res.status(201).json(newUser);
    } catch (error) {
      // Gérer les erreurs
      console.error(error);
      res.status(500).json({
        error: "Une erreur est survenue lors de l'enregistrement du client.",
      });
    }
  });

  router.post("/verify-token", async function (req, res) {
    const { token } = req.body;

    try {
      // Verify the token
      const decoded = jwt.verify(token, secretKey);
      const userId = decoded.userId;
      await userService.update(userId, { isVerified: true });

      res.status(200).json({ message: "Token verified successfully" });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Token verification failed" });
    }
  });



  return router;
};