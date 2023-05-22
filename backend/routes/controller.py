import pandas

START_TIMESTAMP = 'start_timestamp'
END_TIMESTAMP = 'time:timestamp'
CASE_ID = 'case:concept:name'
ACTIVITY = 'concept:name'

class Core:
    def __init__(self) -> None:
        self.log = None

    def load_log_data(self, file_path):
        """ Loads the csv from file_path into an acceptable log data. """
        df = pandas.read_csv(file_path, encoding = "utf-8",
                             parse_dates=['Start', 'End'],
                             dtype={ 'NPU': str })
        self.log = df.rename(columns={
            "Start": START_TIMESTAMP,
            "Movimento": ACTIVITY,
            "End": END_TIMESTAMP,
            "NPU": CASE_ID,
        })

core_instance = Core()
core_instance.load_log_data("./data/pequeno.csv")