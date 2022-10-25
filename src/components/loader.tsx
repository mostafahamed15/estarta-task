interface ILoader {
  className?: string;
}

export const Loader = ({ className = '' }: ILoader) => {
  return (
    <div className={`d-flex justify-content-center ${className}`}>
      <div className="spinner-border" role="status">
        <span className="sr-only"> </span>
      </div>
    </div>
  );
};
