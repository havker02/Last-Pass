const Credentials = ({credentials, onDelete}) => {
  
/*
  if (!credentials || credentials?.length === 0) {
    <p className="text-sm text-slate-500 pt-4">Your vault is empty</p>
  }
*/
  
  return (
    <div>
      {!credentials || credentials?.length === 0 ? (
        <p className="text-sm text-slate-500 pt-4">Your vault is empty</p>
      ) : (
        credentials.map((credential) => {
          return (
            <div className="mt-2" key={credential._id}>
              <p className="text-lg font-bold overflow-scroll">
                {credential.url}
              </p>
              <div className="mt-2 mb-3">
                <p className="overflow-scroll">User: {credential.user}</p>
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">Pass: {credential.password}</p>
              </div>
<div className="mb-4">
  <button onClick={()=> onDelete(credential._id)}
    className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
</div>
              <hr />
            </div>
          );
        })
      )}
    </div>
  );
};

export default Credentials;
