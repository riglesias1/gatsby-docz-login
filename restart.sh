echo "**************************"
echo "*** Stopping container ***"
echo "**************************"

docker compose down --remove-orphans

echo "**************************"
echo "*** Creating container ***"
echo "**************************"

docker compose up -d

echo "**************************"
echo "******** FINISH! ********"
echo "**************************"