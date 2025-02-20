import useBrands from "../Hooks/useBrands";

export default function Brands() {
  let { data, isLoading } = useBrands();

  return (
    <>
    {isLoading ? (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ) : (
      <div className="row justify-content-center">
        {data?.data.data.map((category, index) => (
          <div className="col-sm-6 col-md-4 col-lg-3 p-2" key={index}>
            <div className="card border border-secondary rounded-lg transition-shadow duration-500 hover:shadow-lg">
              <div
                className="card-img-top"
                style={{
                  height: '240px',
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderTopLeftRadius: '0.375rem',
                  borderTopRightRadius: '0.375rem',
                }}
              ></div>
              <div className="card-body">
                <h2 className="card-title text-center">{category.name}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </>
  );
}