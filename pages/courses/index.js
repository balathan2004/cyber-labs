import Card from "@/components/card";
import PlayList_Card from "@/components/playlist-card";
export default function Courses({ data }) {
  return (
    <div className="container">
      <h1>Courses</h1>

      <div className="container">
        {data
          ? data.map((item) => {
              return (
                <PlayList_Card
                  playlist_data={item}
                  key={item.id}
                  isAdmin={false}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const apiUrl = "http://localhost:3000/api/client/get_client_playlist";

  const response = await fetch(apiUrl, {
    method: "GET",
    contentType: "application/json",
  });

  const res = await response.json();

  return {
    props: {
      data: res.data,
    },
  };
}
