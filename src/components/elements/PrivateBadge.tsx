import clsx from "clsx";

const PrivateBadge = ({ hidden = false }: { hidden?: boolean }) => {
  return (
    <div
      className={clsx(
        "bg-accent text-base_text py-2 px-4 font-semibold  absolute top-0 right-0 z-10",
        hidden && "hidden"
      )}
    >
      非公開
    </div>
  );
};

export default PrivateBadge;
