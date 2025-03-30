import { Parser } from "@/types/PreferenceTypes";
/* input
SCORE
SEO_SCORE = 100;
REDABILITY_SCORE = 100;
VIRALITY_SCORE = 100;
METATAGS
META_TITLE = "some title";
META_DESCRIPTION = "some description";
SUGGESTION
SUGGESTED_KEYWORDS = "keyword1" , "keyword2" , "...";
IMPROVEMENTS = "";
*/
/* output
interface Parser {
  MetaTags: {
    MetaTitle: string;
    MetaDescription: string;
  };
  SuggestedKeywords: string[];
  Score: {
    SEO: number;
    RedabilityScore: number;
    Virality: number;
  };
}
*/

async function Seo_Parser(message: Promise<string>): Promise<Parser> {
  const lines = (await message)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);

  const result: Parser = {
    MetaTags: {
      MetaTitle: "",
      MetaDescription: "",
    },
    SuggestedKeywords: [],
    Score: {
      SEO: 0,
      RedabilityScore: 0,
      Virality: 0,
    },
  };

  for (const line of lines) {
    if (line.startsWith("SEO_SCORE")) {
      result.Score.SEO = parseInt(line.split("=")[1].trim(), 10);
    } else if (line.startsWith("REDABILITY_SCORE")) {
      result.Score.RedabilityScore = parseInt(line.split("=")[1].trim(), 10);
    } else if (line.startsWith("VIRALITY_SCORE")) {
      result.Score.Virality = parseInt(line.split("=")[1].trim(), 10);
    } else if (line.startsWith("META_TITLE")) {
      result.MetaTags.MetaTitle = line.split("=")[1].trim().replace(/"/g, "");
    } else if (line.startsWith("META_DESCRIPTION")) {
      result.MetaTags.MetaDescription = line
        .split("=")[1]
        .trim()
        .replace(/"/g, "");
    } else if (line.startsWith("SUGGESTED_KEYWORDS")) {
      result.SuggestedKeywords = line
        .split("=")[1]
        .split(",")
        .map((keyword) => keyword.trim().replace(/"/g, ""));
    }
  }

  return result;
}

export { Seo_Parser };
