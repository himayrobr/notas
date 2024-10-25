const router  =  require("express").Router();


router.post("/login", async (req, res) => {
    res.status(200).json({
        message: "Iniciar Sesion"
    });
});
router.post("/", async (req, res) => {
    res.status(200).json({
        message: "Crear Usuario"
    });
});

router.post("/logout", async (req, res) => {
    res.status(200).json({
        message: "cerrar sesion"
    });
});

router.put("/:id", async (req, res) => {
    res.status(200).json({
        message: "actualizar usuario"
    });
});
router.delete("/:id", async (req, res) => {
    res.status(200).json({
        message: "Crear Usuario"
    });
});
module.exports = router;