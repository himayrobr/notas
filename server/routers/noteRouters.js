const router  =  require("express").Router();

router.get("/", async (req, res) => {
    res.status(200).json({
        message: "Obtener Todas Las Notas"
    })
});

router.get("/:id", async (req, res) => {
    res.status(200).json({
        message: "Obtener Nota Especifica"
    })
});

router.get("/search", async (req, res) => {
    res.status(200).json({
        message: "Buscar Notas"
    })
});

router.get("/:id/history", async (req, res) => {
    res.status(200).json({
        message: "Obtener Historial de Cambios de Nota"
    })
});
router.post("/", async (req, res) => {
    res.status(200).json({
        message: "Crear Nota"
    })
});
router.post("/:id/history", async (req, res) => {
    res.status(200).json({
        message: "Crear Nueva Version de Nota"
    })
});

router.put("/:id", async (req, res) => {
    res.status(200).json({
        message: "Actualizar Nota"
    })
});
router.delete("/:id", async (req, res) => {
    res.status(200).json({
        message: "Eliminar Nota"
    })
});

module.exports = router;