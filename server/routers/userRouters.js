const router  =  require("express").Router();

router.get("/", async (req, res) => {
    res.status(200).json({
        message: "Crear Usuario"
    });
});
router.get("/login", async (req, res) => {
    res.status(200).json({
        message: "Iniciar Sesion"
    });
});
router.get("/logout", async (req, res) => {
    res.status(200).json({
        message: "cerrar sesion"
    });
});

router.get("/", async (req, res) => {
    res.status(200).json({
        message: "Crear Usuario"
    });
});
router.get("/", async (req, res) => {
    res.status(200).json({
        message: "Crear Usuario"
    });
});
module.exports = router;