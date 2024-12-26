import React from "react";

const Notfound = () => {
  return (
    <div className="max-w-[1170px] mx-auto flex items-center justify-center">
      <img
        src="https://cdn3d.iconscout.com/3d/premium/thumb/404-error-page-3d-icon-download-in-png-blend-fbx-gltf-file-formats--not-found-miscellaneous-pack-icons-5701571.png"
        alt=""
        className=""
      />
      <div>
        <div>
          <h3 className="font-bold text-[70px]">Uh oh! Error 404</h3>
          <p className="text__para">
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
        </div>
        <div className="flex gap-5 mt-2">
          <button className="btn rounded-full">
            <a href="/">Back to homepage</a>
          </button>
          <button className="btn rounded-full bg-yellowColor">
            <a href="/contact">Contact Us</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
