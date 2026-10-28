import os
import fitz

#Im not running this, becase its the teachers code and his files. I dont have access to them. I could do the same with my files, but i am focusing on understanding the flow.
origen = "/home/josevicente/Escritorio"
destino = "/home/josevicente/Escritorio/todos_los_pdfs.txt"

with open(destino, "w", encoding="utf-8") as salida:

    for raiz, carpetas, archivos in os.walk(origen):
        for archivo in archivos:
            if archivo.lower().endswith(".pdf"):
                ruta = os.path.join(raiz, archivo)
                print("Procesando:", ruta)

                try:
                    with fitz.open(ruta) as pdf:
                        salida.write("\n\n" + "=" * 80 + "\n")
                        salida.write("ARCHIVO: " + ruta + "\n")
                        salida.write("=" * 80 + "\n\n")

                        for pagina in pdf:
                            salida.write(pagina.get_text())
                            salida.write("\n")

                except Exception as e:
                    print("Error:", e)

print("Todos los PDF acumulados en:", destino)