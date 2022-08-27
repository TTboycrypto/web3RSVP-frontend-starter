// import helpers from web3.storage and the path module

import { Web3Storage, File, getFilesFromPath } from "web3.storage";
const { resolve } = require("path");

// exporting default handeler function to handle incoming requests. Store event data if it is a post request.

export default async function handler(req, res) {
    if (req.method === "POST") {
      return await storeEventData(req, res);
    } else {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }

// new async function to get event data from request body and store the data. successfule storage will return cid that points to an IPFS directory.

// within async function storeEventData two additonal funcitons will be called:
// makeFileObjects = create a json file that inculdes metadata passed form the req.body object.
// storeFiles = store json file to Web3.storage

async function storeEventData(req, res) {
    const body = req.body;
    try {
      const files = await makeFileObjects(body);
      const cid = await storeFiles(files);
      return res.status(200).json({ success: true, cid: cid });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Error creating event", success: false });
    }
  }

// makeFileObjects aysnc function will create a "buffer" from the stringified.
// makeFileObjects function will look up image from body.image.
// getFilesFromPath, function from Web3.storage, can be used to get image from our images folder. Will return the image in an array so we can push our data file to this array so we can upload both the image and the event data at the same time.
// getFilesFromPath will be used to create a new File from the buffer which we can name data.json, and then push thos to the files array!

async function makeFileObjects(body) {
    const buffer = Buffer.from(JSON.stringify(body));
  
    const imageDirectory = resolve(process.cwd(), `public/images/${body.image}`);
    const files = await getFilesFromPath(imageDirectory);
  
    files.push(new File([buffer], "data.json"));
    return files;
  }

// files are ready to be uploaded.
// We want to first create a Web3Storage client object to interact with, function,:

function makeStorageClient() {
    return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
  }


// Web3Storage client is created - we can call "put" method on the cloent to upload our array of files.

async function storeFiles(files) {
    const client = makeStorageClient();
    const cid = await client.put(files);
    return cid;
  }

// when our files have been uploaded, "client.put" returns a content identified (CID).
// This CID is the unique hash that we will store on-chain and use to retrieve our files!!