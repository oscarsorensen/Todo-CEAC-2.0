import time
import subprocess

#vi tager her aemet fordi det er en nem ting at connecte til og bruge
while True:
    print("Yo soy un agente")

    subprocess.run([
        "curl",
        "-L",
        "-s",
        "https://www.aemet.es/xml/municipios/localidad_46250.xml",
        "-o",
        "aemet.xml"
    ])

    time.sleep(60)

    