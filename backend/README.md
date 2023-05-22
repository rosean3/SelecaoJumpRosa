# Backend

## How to run the backend locally

1. Install Graphviz

pm4py uses graphviz to generate the images outputted by process mining algorithms.

Most linux distributions include graphviz in the default package manager, so you may install it with:
```sh
sudo apt-get install graphviz
```

For Windows, you can follow this tutorial:

https://iotespresso.com/how-to-install-graphviz-on-windows/

Maybe you need to add the graphviz bin folder to the PATH environment variable.
```py
import os
os.environ["PATH"] += os.pathsep + 'C:/Program Files/Graphviz 2.44.1/bin/'
```

2. Change to backend directory
```sh
cd backend
```

3. Install dependencies
```sh
pip install -r requirements.txt
```

4. Run the server
```sh
uvicorn main:app --reload
```