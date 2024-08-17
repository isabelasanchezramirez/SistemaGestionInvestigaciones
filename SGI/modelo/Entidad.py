class Entidad:
    def __init__(self, initial_properties=None):
        self.propiedades = initial_properties or {}

    def __getitem__(self, nombre):
        return self.propiedades.get(nombre)

    def __setitem__(self, nombre, value):
        self.propiedades[nombre] = value

    def obtener_propiedades(self):
        return self.propiedades.copy()
