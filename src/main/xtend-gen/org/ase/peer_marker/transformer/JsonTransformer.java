package org.ase.peer_marker.transformer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Objects;
import com.tobykurien.sparkler.Helper;
import com.tobykurien.sparkler.db.DatabaseManager;
import javax.sql.DataSource;
import org.eclipse.xtext.xbase.lib.Exceptions;
import org.eclipse.xtext.xbase.lib.Functions.Function2;
import org.javalite.activejdbc.Base;
import org.javalite.activejdbc.LazyList;
import org.javalite.activejdbc.Model;
import spark.Request;
import spark.Response;
import spark.ResponseTransformerRoute;

/**
 * Returns a JSON serialized version of Model objects
 */
@SuppressWarnings("all")
public class JsonTransformer extends ResponseTransformerRoute {
  private Function2<? super Request,? super Response,? extends Object> handler;
  
  public JsonTransformer(final String path, final Function2<? super Request,? super Response,? extends Object> handler) {
    super(path, "application/json");
    this.handler = handler;
  }
  
  public String render(final Object json) {
    return json.toString();
  }
  
  public String escapeString(final String s) {
    String _replace = s.replace("\"", "\\\"");
    return _replace;
  }
  
  public Object handle(final Request request, final Response response) {
    String _xblockexpression = null;
    {
      response.type("application/json");
      String _xtrycatchfinallyexpression = null;
      try {
        String _xblockexpression_1 = null;
        {
          DataSource _newDataSource = DatabaseManager.newDataSource();
          Base.open(_newDataSource);
          Object model = this.handler.apply(request, response);
          String _xifexpression = null;
          boolean _equals = Objects.equal(model, null);
          if (_equals) {
            String _xblockexpression_2 = null;
            {
              response.status(404);
              _xblockexpression_2 = ("{\'error\': \'Object not found\'}");
            }
            _xifexpression = _xblockexpression_2;
          } else {
            String _xifexpression_1 = null;
            if ((model instanceof Model)) {
              return ((Model) model).toJson(false);
            } else {
              String _xifexpression_2 = null;
              if ((model instanceof LazyList)) {
                return ((LazyList) model).toJson(false);
              } else {
                String _xifexpression_3 = null;
                boolean _equals_1 = Objects.equal(model, null);
                if (_equals_1) {
                  _xifexpression_3 = null;
                } else {
                  ObjectMapper _objectMapper = new ObjectMapper();
                  String _writeValueAsString = _objectMapper.writeValueAsString(model);
                  _xifexpression_3 = _writeValueAsString;
                }
                _xifexpression_2 = _xifexpression_3;
              }
              _xifexpression_1 = _xifexpression_2;
            }
            _xifexpression = _xifexpression_1;
          }
          _xblockexpression_1 = (_xifexpression);
        }
        _xtrycatchfinallyexpression = _xblockexpression_1;
      } catch (final Throwable _t) {
        if (_t instanceof Exception) {
          final Exception e = (Exception)_t;
          String _xblockexpression_2 = null;
          {
            response.status(500);
            String error = Helper.handleError(request, response, e);
            System.err.println(error);
            String _escapeString = this.escapeString(error);
            String _plus = ("{\"error\" : \"" + _escapeString);
            String _plus_1 = (_plus + "\"}");
            _xblockexpression_2 = (_plus_1);
          }
          _xtrycatchfinallyexpression = _xblockexpression_2;
        } else {
          throw Exceptions.sneakyThrow(_t);
        }
      } finally {
        Base.close();
      }
      _xblockexpression = (_xtrycatchfinallyexpression);
    }
    return _xblockexpression;
  }
}
