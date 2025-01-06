export const controlError = (err: any) => {
  if (err.name === "SequelizeDatabaseError") {
    const sqlError = err.original;
    console.log("Mensaje de error desde SQL Server:", sqlError.message);
    console.log("Pila de errores:", sqlError.stack);
    throw new Error(sqlError.message);
  } else {
    console.log("Error >> ", err);
    throw new Error(err || "Error en el servidor.");
  }
};
