import asyncio
import aiohttp
import ssl
import certifi

from lmnt.api import Speech

LMNT_API_KEY = '7991857ac4ec4f01a355ac46b659010b'  # fill in your API key here

async def main():
    ssl_context = ssl.create_default_context(cafile=certifi.where())
    connector = aiohttp.TCPConnector(ssl=ssl_context)
    
    async with aiohttp.ClientSession(connector=connector) as session:
        async with Speech(LMNT_API_KEY, session=session) as speech:
            synthesis = await speech.synthesize('Hello, world.', voice='lily', format='wav')
            with open('output.wav', 'wb') as f:
                f.write(synthesis['audio'])

asyncio.run(main())
