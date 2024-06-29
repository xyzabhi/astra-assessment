"use client";

import { Button } from "@/components/ui/button";
import CustumTable from "@/components/ui/customTable";
import { Input } from "@/components/ui/input";
import { keysEntityMap, STAR_WARS_API_BASE_URL } from "@/lib/constants";
import { characterDataType } from "@/lib/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function EntityPage({}) {
  const pathname: string = usePathname();
  const [data, setData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [currPageNumber, setCurrPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [films, setFilms] = useState([]);
  const [sortOrder, setSortOrder] = useState(0); //0 -DEFAULT 1->ASC 2->DESC

  const [currPage, setCurrPage] = useState(
    `https://www.swapi.tech/api${pathname}?page=1&limit=10`
  );

  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const getUrlsOfEntityItems = (data: any) => {
    return data.map((item: { url: any }) => item.url);
  };
  //Fectch All Films
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await fetch(STAR_WARS_API_BASE_URL + "films");
        const filmResults = await res.json();
        const filmList = filmResults.result.map(
          (item: any) => item.properties.title
        );
        setFilms(filmList);
      } catch {
        console.error("Error fetching data:", error);
      }
    };
    fetchFilms();
  }, []);

  const handleSortOrder = () => {
    if (sortOrder === 0) {
      setSortOrder(1);
    } else if (sortOrder === 1) {
      setSortOrder(2);
    } else {
      setSortOrder(0);
    }
  };

  useEffect(() => {
    if (sortOrder === 0) setFilteredData(data);
    else if (sortOrder === 1) {
      const tempData = data.sort((a: any, b: any) =>
        b.Name.localeCompare(a.Name)
      );
      setFilteredData(tempData);
    } else if (sortOrder === 2) {
      const tempData = data.sort((a: any, b: any) =>
        a.Name.localeCompare(b.Name)
      );
      setFilteredData(tempData);
    }
  }, [sortOrder]);

  const filterDataAsPerAsType = (
    data: any[],
    keys: { label: string; key: string }[]
  ) => {
    const filteredData = data.map((item: any) => {
      const tableRow: any = {};
      keys.forEach((key: { label: string; key: string }) => {
        // Correctly access item[key.key] to get the value based on the provided key
        tableRow[key.label] = item.result.properties[key.key];
      });
      return tableRow;
    });
    return filteredData;
  };
  const handleSearch = (name: string) => {
    const tempData = data.filter((item: any) =>
      item.Name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredData(tempData);
  };

  useEffect(() => {
    const fetchDataAndFetchAllData = async () => {
      try {
        // Fetch initial data
        setLoading(true);
        const res = await fetch(currPage);
        const result = await res.json();
        const urls = getUrlsOfEntityItems(result.results); // Assuming getUrlsOfEntityItems is defined elsewhere
        setNextPage(result.next);
        setPrevPage(result.previous);
        setTotalPages(result.total_pages);
        // Fetch additional data from extracted urls
        const fetchAllData = async (urls: any[]) => {
          try {
            const fetchPromises = urls.map((url) =>
              fetch(url).then((response) => {
                if (!response.ok) {
                  throw new Error(
                    `Failed to fetch data from ${url}: ${response.statusText}`
                  );
                }
                return response.json();
              })
            );

            let data = await Promise.all(fetchPromises);

            data = filterDataAsPerAsType(
              data,
              keysEntityMap[pathname.substring(1).toLocaleLowerCase()]
            );
            setData(data);
            setFilteredData(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };

        // Call fetchAllData with the extracted urls
        await fetchAllData(urls);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchDataAndFetchAllData(); // Call the combined function to initiate data fetching
  }, [pathname, currPage]);

  return loading ? (
    <div className="flex flex-row min-h-[500px] justify-center items-center">
      <div className="w-12 h-12 rounded-full animate-spin border-8 border-solid border-yellow-500 border-t-transparent"></div>
    </div>
  ) : (
    <div>
      <Input
        type="text"
        className="mb-2 text-yellow-500"
        placeholder="Search ...."
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <CustumTable
        data={filteredData}
        isAsc={sortOrder}
        handleSortOrder={handleSortOrder}
        filmList={films}
      />
      <div className="flex items-center justify-between mt-5">
        <Button
          disabled={!prevPage}
          onClick={() => {
            setCurrPage(prevPage ?? "");
            setCurrPageNumber(currPageNumber - 1);
          }}
        >
          Prev
        </Button>
        {totalPages && <p>{`${currPageNumber}/${totalPages}`}</p>}
        <Button
          disabled={!nextPage}
          onClick={() => {
            setCurrPage(nextPage ?? "");
            setCurrPageNumber(currPageNumber + 1);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default EntityPage;
