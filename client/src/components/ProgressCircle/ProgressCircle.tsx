import "./style.scss";

interface CircleProgressBarProps {
  progress: number;
}

interface ProgressStyle {
  "--p": string;
}

export const ProgressCircle = ({ progress }: CircleProgressBarProps) => {
  const progressStyle: ProgressStyle = {
    "--p": `${progress}`,
  };

  return (
    <div className="pie" style={progressStyle as React.CSSProperties}>
      {progress}%
    </div>
  );
};
