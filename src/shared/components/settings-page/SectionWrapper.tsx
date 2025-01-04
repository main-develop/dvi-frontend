type SectionWrapperProperties = {
  title: string;
  description: string | React.ReactNode;
  children: React.ReactNode;
};

export const SectionWrapper = ({
  title,
  description,
  children,
}: SectionWrapperProperties): React.JSX.Element => {
  return (
    <div className="px-7">
      <h2 className="text-lg text-[#9ca3af]">{title}</h2>
      <p className="text-[15px] text-[#9ca3afc5] mt-1">{description}</p>
      {children}
    </div>
  );
};
