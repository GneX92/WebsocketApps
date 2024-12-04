using Fleck;
using System;
using System.Collections.Generic;

namespace MyFirstSocket
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start( object sender , EventArgs e )
        {
            List<IWebSocketConnection> allSockets = new List<IWebSocketConnection>();

            WebSocketServer server = new WebSocketServer( "ws://127.0.0.1:8081" );

            server.Start( socket =>
            {
                socket.OnOpen = () => allSockets.Add( socket );

                socket.OnClose = () => allSockets.Remove( socket );

                socket.OnMessage = message =>
                {
                    string response = null;

                    if ( message == "getdate" )
                    {
                        response = DateTime.Now.ToShortDateString();
                    }

                    if ( message == "gettime" )
                    {
                        response = DateTime.Now.ToLongTimeString();
                    }

                    foreach ( IWebSocketConnection s in allSockets )
                    {
                        s.Send( response ?? "invalid Request" );
                    }
                };
            } );
        }
    }
}