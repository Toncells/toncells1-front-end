const GetStatus = async () => await fetch(`https://app.toncells.org:9967/API/getStatus`, {
    method: "get",
  }).then((e: any) => e.json())

export default GetStatus;
