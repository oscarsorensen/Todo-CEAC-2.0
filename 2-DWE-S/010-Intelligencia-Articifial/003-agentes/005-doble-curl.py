import time
import subprocess
#here we are testing agent limits and looking at what we can do. Josevicente got the code with ai, and we are just playing around right now.
#an agent is like a spider with multiple legs. All of the legs are API´s or SMTPs or whatever, things which can connect to other programs and give or take information back to us.

while True:
    print("Yo soy un agente")

    # Descargar XML de AEMET
    descarga = subprocess.run([
        "curl",
        "-f",
        "-L",
        "-s",
        "-S",
        "https://www.aemet.es/xml/municipios/localidad_46250.xml",
        "-o",
        "aemet.xml"
    ])

    if descarga.returncode != 0:
        print("Error descargando AEMET")
        time.sleep(60)
        continue

    # Leer XML con codificación correcta
    with open("aemet.xml", "r", encoding="iso-8859-15") as archivo:
        xml = archivo.read()

    # Preparar prompt
    prompt = f"""
    Eres un agente meteorológico.

    Interpreta este XML de AEMET y explica
    la previsión meteorológica en español.

    Incluye:
    - Estado del cielo
    - Temperaturas
    - Probabilidad de lluvia
    - Viento
    - Recomendaciones

    No inventes datos.

    XML:
    {xml}
    """

    # Ejecutar Ollama
    resultado = subprocess.run(
        ["ollama", "run", "granite4.1:8b"],
        input=prompt,
        text=True,
        capture_output=True
    )

    if resultado.returncode == 0:
        print("\n--- RESPUESTA DE OLLAMA ---\n")
        print(resultado.stdout)
    else:
        print("Error:", resultado.stderr)

    time.sleep(60)