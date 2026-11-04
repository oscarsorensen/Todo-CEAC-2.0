<VirtualHost *:443>
    ServerAdmin info@jocarsa.com
    ServerName ayuda.jocarsa.com
    ServerAlias www.ayuda.jocarsa.com

    DocumentRoot /var/www/html/jocarsa-ayuda

    SSLEngine on
    SSLCertificateFile [ruta]
    SSLCertificateKeyFile [ruta]

    <Directory /var/www/html/jocarsa-ayuda>
        Options FollowSymLinks
        AllowOverride All
        Require all granted

        Header always set Access-Control-Allow-Origin "*"
        Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
        Header always set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
        Header always set Access-Control-Max-Age "86400"
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/ayuda-error.log
    CustomLog ${APACHE_LOG_DIR}/ayuda-access.log combined
</VirtualHost>