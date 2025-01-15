type LoadingTextProperties = {
  isLoading: boolean;
  loadingText?: string;
  primaryText?: string;
  className?: string;
};

export const LoadingText = ({
  isLoading,
  loadingText,
  primaryText,
  className,
}: LoadingTextProperties): React.JSX.Element => {
  return (
    <div>
      {isLoading ? (
        <div className="flex items-center">
          <span>{loadingText}</span>
          <div
            className={`flex items-center justify-center mt-2 loading-container ${className ? className : ""}`}
          >
            <div className="loading-circle"></div>
            <div className="loading-circle"></div>
            <div className="loading-circle"></div>
          </div>
        </div>
      ) : (
        <span>{primaryText}</span>
      )}
    </div>
  );
};
