const router  =  require("express").Router({ mergeParams: true});


router.get("/search", 
    (req, res) => {
    res.status(200).json({
        message: "Buscar Notas"
    });
}, (req, res) => {
    res.status(200).json({
        message: "buscar notas"
    });
}, (req, res) => {
    res.status(200).json({
        message: "buscar notas"
    });
});
router.get("/:id/history", (req, res) => {
    res.status(200).json({
        message: "Obtener Historial de Cambios de Nota"
    })
});
router.get("/:id", "1.0.0" (req, res, ) => {
    res.status(200),json({
        message: "Obtener Nota Especifica id"
    });
});
router.get("/:name", "1.1.0" (req, res, ) => {
    res.status(200),json({
        message: "Obtener Nota Especifica por nombre"
    });
});
router.get("/:name", "1.1.1" (req, res, ) => {
    res.status(200),json({
        message: "Obtener Nota Especifica por nombre"
    });
});
router.get("/:history", "1.2.0" (req, res, ) => {
    res.status(200),json({
        message: "Obtener Nota Especifica historiaL"
    });
});
router.get("/", (req, res) => {
    res.status(200).json({
        message: "Obtener Todas Las Notas"
    })
});
router.post("/:id/history", (req, res) => {
    res.status(200).json({
        message: "crear nueva Nota"
    })
});
router.post("/", (req, res) => {
    res.status(200).json({
        message: "crear nueva Nota"
    })
});
router.put("/:id", (req, res) => {
    res.status(200).json({
        message: "Actualizar Nota"
    })
});
router.delete("/:id", (req, res) => {
    res.status(200).json({
        message: "Eliminar Nota"
    })
});

module.exports = router;